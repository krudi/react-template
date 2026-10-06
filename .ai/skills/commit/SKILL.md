---
name: commit
description:
    Create a conventional commit for staged or unstaged React Template changes. Inspects the diff, drafts the message, and
    creates the commit.
---

# Conventional Commit

## Steps

1. Run `git status` and `git diff HEAD` to understand all changes
2. Run `git log --oneline -5` to match recent commit style
3. Draft a commit message:
    - `type(scope): subject` — imperative, lowercase, <= 70 chars
    - Body: bullets explaining why, wrapped at 80 chars
    - Add `BREAKING CHANGE:` footer only if applicable
4. Stage relevant files with `git add <specific-files>`; avoid `git add .`
5. Commit via heredoc to preserve formatting

## Types

`feat` · `fix` · `docs` · `style` · `refactor` · `perf` · `test` · `build` · `ci` · `chore` · `revert`

## Scopes

Use practical scopes such as `auth`, `db`, `seed`, `ui`, `styles`, `config`, `seo`, `tooling`, `vscode`, `skills` or `docs`.

## Never

- Skip hooks with `--no-verify`
- Amend existing commits unless explicitly asked
- Stage `.env` files or secrets
