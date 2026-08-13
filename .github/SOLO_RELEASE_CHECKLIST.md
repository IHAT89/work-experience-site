# Solo Release Checklist

Purpose: help a solo developer ship excellent apps consistently with low regression risk.

## Pre-Merge

- [ ] Objective and scope are clear in PR summary.
- [ ] RGOGC traceability is filled: Role, Goal, Output, Guardrails, Context.
- [ ] Typecheck passed on touched scope.
- [ ] Lint passed on touched scope.
- [ ] Focused test or build passed on touched scope.
- [ ] Security checks done (no secrets, input boundaries validated).
- [ ] Folder placement and shared-module reuse reviewed.
- [ ] User-facing states reviewed (loading, empty, success, error).
- [ ] Scorecard total meets repo threshold.

## Pre-Deploy

- [ ] Deployment target and rollback path confirmed.
- [ ] Environment and secrets validated in correct target.
- [ ] Database migration impact checked (if applicable).
- [ ] Health endpoint and smoke-test commands prepared.
- [ ] Monitoring and alerting coverage confirmed.
- [ ] Post-deploy validation checklist executed.
- [ ] Incident notes updated if any risk or drift discovered.

## Post-Deploy

- [ ] Health check green.
- [ ] Key user journey smoke tests green.
- [ ] Error logs reviewed for regressions.
- [ ] Follow-up tasks captured with owner and priority.
