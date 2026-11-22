---
name: commit
description:
    Create a conventional commit only when the user explicitly asks to commit. Inspects the diff, drafts the message,
    and creates the commit.
---

# Conventional Commit

## Steps

1. Run `git status` and `git diff HEAD` to understand all changes
2. Run `git log --oneline -5` to match recent commit style and scopes
3. Draft a commit message:
   - `type(scope): subject` — a short, professional subject naming the concrete change: imperative, lowercase, ≤ 70 chars
   - Body: at most one short line saying why, only when it is not obvious; no bullets
   - Add `BREAKING CHANGE:` footer only if applicable
4. Stage relevant files with `git add <specific-files>` (never `git add .`)
5. Commit via heredoc to preserve formatting

## Types

`feat` · `fix` · `docs` · `style` · `refactor` · `perf` · `test` · `build` · `ci` · `chore` · `revert`, plus any extra
type the repository's `commit-msg` hook allows

## Scopes

Use the area the change touches, as recent commits do; omit the scope when none fits.

## Never

- Skip hooks (`--no-verify`)
- Amend existing commits unless explicitly asked
- Stage `.env` files, secrets, credentials, generated output or unrelated changes
