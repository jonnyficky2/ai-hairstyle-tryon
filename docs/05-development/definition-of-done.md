# Definition of Done

> Status: PROPOSED · Last updated: 2026-11-09
> No task, feature, or release is DONE without evidence.

## 1. Task-level DoD

A task may move to `DONE` only when all apply:

- [ ] Scope implemented exactly as described; no unapproved additions.
- [ ] Every acceptance criterion checked individually.
- [ ] The verification method listed in the task was executed.
- [ ] The evidence listed in the task exists and is linked.
- [ ] Type check passes.
- [ ] Lint passes with no warnings.
- [ ] Relevant unit/integration tests pass.
- [ ] Build passes.
- [ ] Documentation updated where behavior changed.
- [ ] Task board, milestone percentage, and progress report updated.
- [ ] No known critical defect introduced.
- [ ] No secrets or sensitive data added.

Documentation tasks additionally require a consistency check against the documentation map.
Writing a document does not prove it is correct or approved.

## 2. Feature-level DoD

- [ ] All linked requirements and acceptance criteria pass.
- [ ] Manual UAT completed for camera/tracking/rendering features.
- [ ] Accessibility checked for user-facing features.
- [ ] Privacy impact reviewed if any data handling changed.
- [ ] Error and empty states implemented, not just the happy path.
- [ ] Regression tests added for fixed defects.
- [ ] Documentation reflects the shipped behavior.

## 3. Release-level DoD

- [ ] All P0 tasks `DONE`; P1 either `DONE` or explicitly deferred with approval.
- [ ] Manual UAT PASS recorded.
- [ ] Cross-browser/device matrix completed.
- [ ] Privacy verification signed off.
- [ ] Security review has no open high-severity findings.
- [ ] Benchmark targets met or deviations approved.
- [ ] Production build reproducible.
- [ ] Production smoke test passed.
- [ ] Changelog, README, and deployment guide updated.
- [ ] Known limitations documented.

## 4. Evidence standards

| Evidence type | Acceptable form |
|---|---|
| Test result | Real command output or CI log, not a summary |
| Screenshot | Captured from the actual build, with viewport/device noted |
| Recording | Actual session, timestamped |
| Benchmark | Raw log plus summarized metrics |
| Review | Named reviewer and date |
| Decision | Decision-log entry with approver |

## 5. Invalid reasons to mark DONE

- "The code compiles."
- "The document was written."
- "It works on my machine" without recorded evidence.
- "Tests are skipped but should pass."
- "The reviewer will check later."

## 6. Status transitions

```
TODO → IN_PROGRESS → REVIEW → DONE
TODO → BLOCKED → TODO (when the blocker is resolved)
TODO/IN_PROGRESS → CANCELLED (with reason and approval)
DONE → IN_PROGRESS (only if a regression is found; record why)
```
