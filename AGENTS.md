# React Template

Minimal Next.js 16 + React 19 starter template. Intentionally lean — only core dependencies included. Use this as the base when starting a new Next.js project.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Shared configs: `@krudi/eslint-config`, `@krudi/typescript-config`, `@krudi/prettier-config`

## Commands

```bash
npm run dev        # start dev server (localhost:3000)
npm run build      # production build
npm run lint       # eslint + prettier + stylelint
npm run typecheck  # tsc --noEmit
```

## When creating from this template

1. Clone and rename the directory and `package.json` `name` field
2. Update `app/layout.tsx` metadata (title, description)
3. Add project-specific dependencies
4. Create project `AGENTS.md` with stack and domain context
5. Create `.ai/config.json` with project metadata

## Cross-project context

- **Uses config from:** `shared-configs` (`@krudi/eslint-config`, `@krudi/typescript-config`, `@krudi/prettier-config`)
- When `shared-configs` publishes a new version, update `package.json` in this template

---

## Notes

This template tracks `@krudi/*` config packages — keep them up to date when shared-configs releases a new version.

---

## Rules

@.ai/rules/nextjs.md

---

## For Claude Code

### Slash commands

| Command | What it does |
|---------|---|
| `/test` | Run lint, typecheck, and build |

### Rules loaded automatically

| Rule file | Applied to |
|-----------|---|
| `.ai/rules/nextjs.md` | `**/*.tsx`, `**/*.ts` |

### Constraints

- This is a template — keep it intentionally lean; do not add feature-specific code
- When scaffolding a new project from this template, remind the user to update `package.json` name, `app/layout.tsx` metadata, and create a project-specific `AGENTS.md` and `.ai/config.json`
- Always use `@krudi/*` shared configs — do not add standalone ESLint/Prettier/TypeScript configs
