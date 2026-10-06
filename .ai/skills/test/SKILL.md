---
name: test
description:
    Run the project's full verification suite (lint, typecheck, build, and tests where present). Use when asked to
    verify, check, or test the project before a commit or PR.
---

# Test

AGENTS.md is the single source for which checks to run:

1. Pick the rows of its verification table that match the changed areas (`git status`, `git diff HEAD`).
2. For cross-cutting changes or a final handoff, run every "Before completion" command of the `src/**` row.

Run commands from the repository root with the Node version in `.nvmrc`. Report failures with file:line references and
the exact command; if all pass, confirm with a short summary.
