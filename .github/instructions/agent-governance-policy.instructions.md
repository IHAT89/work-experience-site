---
description: >
  Global coding-agent governance policy. Use for planning, implementation,
  refactoring, validation, security, and user experience quality checks.
applyTo: "**"
---

# Agent Governance Policy

## Mission

Ship production-safe, maintainable code and professional user experience outcomes
through small validated changes and clear documentation.

## Non-Negotiable Rules

1. Never break known working behavior for convenience.
2. Never commit secrets, tokens, credentials, or private keys.
3. Never do large risky rewrites when safe extraction is possible.
4. Always run targeted validation after meaningful changes.
5. Always preserve or improve UX clarity.

## Operating Workflow

1. Intake before implementation:
   - Capture fragmented critique notes before coding.
   - Do not implement directly from unclear notes.
2. Scope and prioritize:
   - Label tasks by priority P0/P1/P2 and by risk.
3. Implement in safe slices:
   - Prefer helper extraction and centralization over broad rewrites.
4. Validate each slice:
   - Run typecheck, lint, and focused tests/build on touched scope.
5. Document outcomes:
   - Record files changed, risk reviewed, and evidence from validation.

## Refactor Safety Standard

- Preserve runtime behavior and public contracts unless explicitly approved.
- Keep changes small and easy to roll back.
- Avoid unrelated edits in the same change set.

## Security and Secret Hygiene Standard

- Remove plaintext credentials from code, docs, and prompts.
- Use environment or vault references instead of hardcoded secrets.
- If exposure is found, add a credential rotation action item.

## Professional UX and UI Standard

For user-facing changes, verify:

1. Clarity: what this is, what user can do, what changed.
2. State completeness: loading, empty, success, and error states.
3. Safety: confirmation and clear consequences for destructive actions.
4. Consistency: patterns align with the repository design system.
5. Trust: key values and totals are deterministic and testable.

## Definition of Done

A task is done only when:

1. Scope is clear and implemented minimally.
2. Validation commands pass in touched scope.
3. Security checks for touched surfaces are complete.
4. UX and UI checks are complete for user-facing changes.
5. Final summary includes objective, files changed, validations, and residual risk.

