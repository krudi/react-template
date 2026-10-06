---
name: pr
description: Create a pull request for the current branch with a conventional title and structured React Template test plan.
---

# Pull Request

## Steps

1. Run `git log main..HEAD --oneline` and `git diff main...HEAD` to understand all changes
2. Check if the branch tracks a remote: `git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null`
3. Push if needed: `git push -u origin <branch>`
4. Draft the PR:
    - **Title**: `type(scope): description` — conventional commit format, <= 70 chars
    - **Summary**: 2–3 bullets on what changed and why
    - **Test plan**: checklist of the commands relevant to the change
5. Create: `gh pr create --title "..." --body "$(cat <<'EOF' ... EOF)"`

## Test plan options

List the commands from the AGENTS.md verification table rows that match the diff.

## Never

- Force-push unless explicitly asked
- Use a title that doesn't follow conventional commit format
- Create a PR from `main` or `master`
- Include secrets, `.env` contents, or local-only environment files
