# React Template

Minimal Next.js 16 + React 19 starter template. Intentionally lean — only core dependencies included. Use this as the
base when starting a new Next.js project.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Lint/format: oxlint + oxfmt · TypeScript config: local `tsconfig.json` (project-owned, not shared)

## Commands

```bash
npm run dev        # start dev server (localhost:3000)
npm run build      # production build
npm run lint       # oxlint + oxfmt --check
npm run typecheck  # tsc --noEmit
```

## When creating from this template

1. Clone and rename the directory and `package.json` `name` field
2. Update `app/layout.tsx` metadata (title, description)
3. Add project-specific dependencies
4. Create project `AGENTS.md` with stack and domain context
5. Create `.ai/config.json` with project metadata

---

## Rules

@.ai/rules/nextjs.md @.ai/memory/lessons.md @.ai/skills/commit/SKILL.md @.ai/skills/pr/SKILL.md
@.ai/skills/retrospective/SKILL.md @.ai/skills/test/SKILL.md

## Constraints

- This is a template — keep it intentionally lean; do not add feature-specific code
- When scaffolding a new project from this template, remind the user to update `package.json` name, `app/layout.tsx`
  metadata, and create a project-specific `AGENTS.md` and `.ai/config.json`
- Lint and format with oxlint + oxfmt; keep TypeScript config local to this project (`tsconfig.json`), not a shared
  package

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read
the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next`
package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at
`node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted
change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
