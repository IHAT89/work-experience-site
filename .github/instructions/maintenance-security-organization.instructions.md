---
description: >
  Enforce engineering hygiene standards for code quality, maintainability,
  security posture, and folder organization. Use for all code and documentation changes.
applyTo: "**"
---

# Code Quality, Maintenance, Security, and Folder Organization Standard

## Code Quality Standard

1. Keep functions readable, testable, and bounded in responsibility.
2. Prefer explicit types and deterministic behavior over implicit magic.
3. Minimize complexity: flatten deep nesting and remove duplication where safe.
4. Use consistent naming and predictable error handling patterns.
5. Add or update tests for changed behavior and risky logic paths.
6. Fail builds on lint or type errors in touched scope.

## Code Maintenance Standard

1. Keep changes small, scoped, and easy to review.
2. Prefer incremental refactors over big-bang rewrites.
3. Remove dead code and stale comments during touched-file edits.
4. Keep module responsibilities single-purpose and explicit.
5. Ensure every behavior change has a corresponding validation path.
6. Track technical debt with owner and next action, not vague notes.

## Security Standard

1. No secrets in source, docs, prompts, logs, or sample payloads.
2. Validate and sanitize all external input at boundaries.
3. Use least privilege for service and database access.
4. Keep dependency updates current and patch high or critical findings quickly.
5. Add secure defaults: fail closed, explicit allow-lists, defensive error handling.
6. Document exposure findings with rotation and remediation actions.

## Folder Organization Standard

1. Organize by domain and responsibility, not by random file type growth.
2. Keep top-level folders intentional and limited.
3. Keep shared utilities in explicit shared locations, not copy-pasted near call sites.
4. Prevent circular dependencies across layers.
5. Keep naming consistent and predictable across modules.
6. Move or archive obsolete artifacts so active folders stay clean.

## Review Gate Requirements

Before completion, agent output must include:

1. Code quality impact summary.
2. Maintenance impact summary.
3. Security impact summary.
4. Folder and structure impact summary.
5. Validation evidence for touched scope.
6. Residual risks and follow-up recommendations.
