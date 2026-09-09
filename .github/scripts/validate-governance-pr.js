const fs = require("node:fs");

const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) {
  console.error("GITHUB_EVENT_PATH is not set.");
  process.exit(1);
}

const event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
const pr = event.pull_request;

if (!pr) {
  console.log("No pull_request payload found; skipping.");
  process.exit(0);
}

const labels = (pr.labels || []).map((l) => (l.name || "").toLowerCase());
if (labels.includes("governance-override")) {
  console.log("governance-override label present; bypassing governance checks.");
  process.exit(0);
}

const author = (pr.user?.login || "").toLowerCase();
const authorType = pr.user?.type || "";
const botAuthors = new Set([
  "dependabot[bot]",
  "dependabot",
  "renovate[bot]",
  "renovate",
  "github-actions[bot]",
]);
if (authorType === "Bot" || botAuthors.has(author)) {
  console.log(`Automated dependency PR by ${author || "bot"}; skipping governance checks.`);
  process.exit(0);
}

const repoFull = process.env.GITHUB_REPOSITORY || "";
const repoName = repoFull.includes("/") ? repoFull.split("/")[1] : (event.repository?.name || "");

const thresholdOverrides = {
  "stays-enterprise": 30,
  "stays-vault": 30,
  "property-system": 30,
  "property-system-fg": 30,
  "sage-bridge": 30,
  "travpac-processing": 30,
  "ops-db": 24,
  "transinex-site": 24,
  "work-experience-site": 24,
};

const defaultThreshold = Number.parseInt(process.env.SCORECARD_DEFAULT_THRESHOLD || "27", 10);
const scorecardMax = Number.parseInt(process.env.SCORECARD_MAX || "40", 10);
const threshold = Number.isInteger(thresholdOverrides[repoName]) ? thresholdOverrides[repoName] : defaultThreshold;

const body = (pr.body || "").replace(/\r\n/g, "\n");
const failures = [];
const missingSections = [];
const missingRgogcFields = [];

function getSectionContent(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sectionRegex = new RegExp(`^${escaped}\\s*\\n([\\s\\S]*?)(?=^##\\s|^###\\s|\\Z)`, "m");
  const match = markdown.match(sectionRegex);
  if (!match) {
    return null;
  }
  return match[1].trim();
}

const requiredSections = [
  "## Summary",
  "## RGOGC Prompt Traceability",
  "### Safety and Scope",
  "### Code Quality",
  "### Code Maintenance",
  "### Security and Secrets",
  "### Folder Organization and Architecture",
  "### Validation Evidence",
  "### Documentation and Knowledge Transfer",
  "## Scorecard Total",
];

for (const heading of requiredSections) {
  const content = getSectionContent(body, heading);
  if (content === null) {
    missingSections.push(heading);
    failures.push(`Missing required section: ${heading}`);
    continue;
  }
  if (content.length === 0) {
    failures.push(`Section is blank: ${heading}`);
  }
}

const summary = getSectionContent(body, "## Summary") || "";
if (/^- Objective:\s*$/m.test(summary)) {
  failures.push("Summary Objective is blank.");
}
if (/^- Scope:\s*$/m.test(summary)) {
  failures.push("Summary Scope is blank.");
}
if (/^- Risk level:\s*$/m.test(summary)) {
  failures.push("Summary Risk level is blank.");
}

const rgogc = getSectionContent(body, "## RGOGC Prompt Traceability") || "";
for (const field of ["Role", "Goal", "Output", "Guardrails", "Context"]) {
  const rgx = new RegExp(`^- ${field}:\\s*$`, "m");
  if (rgx.test(rgogc)) {
    missingRgogcFields.push(field);
    failures.push(`RGOGC field is blank: ${field}`);
  }
}

const validation = getSectionContent(body, "### Validation Evidence") || "";
const validationCmdBlock = validation.match(/Validation commands run:\s*\n([\s\S]*?)$/m);
if (!validationCmdBlock) {
  failures.push("Validation commands run block is missing.");
} else {
  const lines = validationCmdBlock[1]
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const hasFilledCommand = lines.some((line) => /^\d+\.\s+\S+/.test(line));
  if (!hasFilledCommand) {
    failures.push("Validation commands are blank. Fill at least one executed command.");
  }
}

let score = null;
let scoreMaxFound = null;
const scoreMatch = body.match(/Scorecard total:\s*(\d+)\s*\/\s*(\d+)/i);
if (!scoreMatch) {
  failures.push(`Missing scorecard total in PR body. Add: Scorecard total: <n>/${scorecardMax}`);
} else {
  score = Number.parseInt(scoreMatch[1], 10);
  scoreMaxFound = Number.parseInt(scoreMatch[2], 10);
  if (scoreMaxFound !== scorecardMax) {
    failures.push(`Scorecard max must be ${scorecardMax}. Found ${scoreMaxFound}.`);
  }
  if (score < threshold) {
    failures.push(`Scorecard total ${score}/${scoreMaxFound} is below threshold ${threshold}/${scorecardMax}.`);
  }
}

const reportPath = process.env.GOVERNANCE_REPORT_PATH || "governance-report.json";
const report = {
  passed: failures.length === 0,
  repository: repoFull,
  threshold,
  scorecardMax,
  score,
  scoreMaxFound,
  failures,
  missingSections,
  missingRgogcFields,
  fixSnippet: `## RGOGC Prompt Traceability\n- Role: <who the AI acted as>\n- Goal: <what was accomplished>\n- Output: <files/artifacts produced>\n- Guardrails: <constraints enforced>\n- Context: <project constraints and audience>\n\n## Scorecard Total\nScorecard total: <n>/${scorecardMax}`,
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

if (!report.passed) {
  console.error("Governance enforcement failed:\n");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  console.error(`\nDetailed report written to ${reportPath}`);
  process.exit(1);
}

console.log(`Governance enforcement passed. Score >= ${threshold}/${scorecardMax}.`);
console.log(`Detailed report written to ${reportPath}`);
