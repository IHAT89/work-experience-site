# Pull Request

## Summary

- Objective:
- Scope:
- Risk level: P0 / P1 / P2

## RGOGC Prompt Traceability

- Role:
- Goal:
- Output:
- Guardrails:
- Context:

## Policy Checklist (Required)

### Safety and Scope

- [ ] Change is scoped and avoids unrelated edits
- [ ] Runtime behavior preserved unless explicitly documented
- [ ] Public contracts reviewed for compatibility

### Code Quality

- [ ] Types, linting, and readability standards are met in touched scope
- [ ] Complexity and duplication are reduced or justified
- [ ] Error handling and edge cases are explicitly covered
- [ ] Tests were added or updated when behavior changed

### Code Maintenance

- [ ] Module responsibilities remain clear and single-purpose
- [ ] Dead code and stale comments removed from touched files
- [ ] Any technical debt introduced is tracked with owner and next action

### Security and Secrets

- [ ] No secrets or credentials added to code, docs, or logs
- [ ] Inputs validated at the boundary where they enter the system
- [ ] Auth and data access patterns follow least-privilege principles
- [ ] Any exposure risk includes rotation or remediation action

### Folder Organization and Architecture

- [ ] Files are placed in correct domain or layer folders
- [ ] Shared logic extracted to shared modules when reused
- [ ] No circular dependency or cross-layer leakage introduced
- [ ] Naming and structure are consistent with repository conventions

### Validation Evidence

- [ ] Typecheck executed on touched scope
- [ ] Lint executed on touched scope
- [ ] Focused test or build executed on touched scope
- [ ] Commands and outcomes pasted below

Validation commands run:

1.
2.
3.

### UX and UI Professional Standard (if user-facing)

- [ ] Loading, empty, success, and error states covered
- [ ] Copy and flows are clear and reduce user confusion
- [ ] Destructive actions include confirmations and clear consequences
- [ ] Visual and interaction patterns are consistent with existing design

### Documentation and Knowledge Transfer

- [ ] Relevant instructions or docs updated
- [ ] Risks, assumptions, and next safe steps recorded

## Scorecard Total

Scorecard total: /40

## Files Changed

- path/file - reason

## Reviewer Focus

- Area 1:
- Area 2:
