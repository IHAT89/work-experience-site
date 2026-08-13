const fs = require("node:fs");

const requiredFiles = [
  ".github/copilot-instructions.md",
  ".github/instructions/agent-governance-policy.instructions.md",
  ".github/instructions/maintenance-security-organization.instructions.md",
  ".github/instructions/rgogc-prompt-framework.instructions.md",
  ".github/pull_request_template.md",
  ".github/agent-run-scorecard.md",
  ".github/SOLO_RELEASE_CHECKLIST.md",
  ".github/scripts/validate-governance-pr.js",
  ".github/workflows/governance-pr-enforcement.yml",
  ".github/workflows/weekly-self-audit.yml",
];

const checks = [];

function addCheck(name, ok, detail = "") {
  checks.push({ name, ok, detail });
}

for (const file of requiredFiles) {
  const exists = fs.existsSync(file);
  addCheck(`File exists: ${file}`, exists, exists ? "" : "Missing required governance file");
}

function safeRead(file) {
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

const prTemplate = safeRead(".github/pull_request_template.md");
addCheck(
  "PR template includes RGOGC section",
  prTemplate.includes("## RGOGC Prompt Traceability"),
  "Missing RGOGC section in PR template"
);
addCheck(
  "PR template includes scorecard line",
  /Scorecard total:\s*\/40/i.test(prTemplate),
  "Missing scorecard total line in PR template"
);

const validator = safeRead(".github/scripts/validate-governance-pr.js");
addCheck(
  "Validator enforces RGOGC fields",
  validator.includes("missingRgogcFields") && validator.includes("RGOGC field is blank"),
  "Validator not enforcing RGOGC completeness"
);
addCheck(
  "Validator supports threshold overrides",
  validator.includes("thresholdOverrides") && validator.includes("SCORECARD_DEFAULT_THRESHOLD"),
  "Validator missing threshold override logic"
);

const governanceWorkflow = safeRead(".github/workflows/governance-pr-enforcement.yml");
addCheck(
  "Governance workflow validates pull requests",
  /pull_request:/m.test(governanceWorkflow),
  "Governance workflow missing pull_request trigger"
);
addCheck(
  "Governance workflow comments on PR failure",
  governanceWorkflow.includes("Comment governance failures on PR") && governanceWorkflow.includes("actions/github-script"),
  "Governance workflow missing auto-comment step"
);

const weeklyWorkflow = safeRead(".github/workflows/weekly-self-audit.yml");
addCheck(
  "Weekly self-audit workflow has schedule",
  /schedule:/m.test(weeklyWorkflow),
  "Weekly self-audit workflow missing schedule trigger"
);

const passed = checks.filter((c) => c.ok).length;
const failed = checks.length - passed;

console.log("# Weekly Governance Self-Audit");
console.log(`- Passed: ${passed}`);
console.log(`- Failed: ${failed}`);
console.log("");

for (const check of checks) {
  const icon = check.ok ? "[PASS]" : "[FAIL]";
  const suffix = (!check.ok && check.detail) ? ` - ${check.detail}` : "";
  console.log(`${icon} ${check.name}${suffix}`);
}

if (failed > 0) {
  process.exit(1);
}
