---
description: Next.js App Router conventions for this template
globs: ["**/*.tsx", "**/*.ts"]
alwaysApply: false
---

# Next.js Conventions

## Router

- Use App Router (`app/`) exclusively — no Pages Router
- Server Components by default; add `'use client'` only when you need browser APIs, event handlers, or hooks
- Co-locate components with their page unless used in 2+ places

## File naming

- Files: kebab-case (`user-profile.tsx`)
- Components: PascalCase export, kebab-case filename
- Server actions: suffix with `Action` (`createUserAction.ts`)
- Route handlers: `route.ts` inside `app/api/...`

## Shared configs (from `@krudi/*`)

- ESLint: `@krudi/eslint-config` · TypeScript: `@krudi/typescript-config`
- Prettier: `@krudi/prettier-config` · Stylelint: `@krudi/stylelint-config`

## Performance

- Prefer `import()` dynamic imports for heavy components
- Use `next/image` for all images — never `<img>`
- Use `next/font` — never load fonts from external CDN

## Commands

```bash
npm run dev        # dev server (localhost:3000)
npm run build      # production build
npm run lint       # eslint + prettier + stylelint
npm run typecheck  # tsc --noEmit
```
