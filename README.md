# react-template

A template with [Next.js](https://nextjs.org) built on [React](https://reactjs.org) with focus on performance and best
practices.

## Quick start

Prerequisites: [Node.js](https://nodejs.org) from `.nvmrc` and [Docker](https://www.docker.com) with Compose.

1. `npm ci`
2. `npm run install:lefthook`
3. `cp .env.example .env`, then set `BETTER_AUTH_SECRET` from `npm run auth:secret`
4. `docker compose up -d --wait`, `npm run db:migrate` and `NODE_ENV=development npm run db:seed`
5. `npm run dev`: <http://localhost:3000>
6. `npm run build` and `npm run start`

## Local database (Docker Compose)

The app talks to a Postgres database and, for local email previews (verification, password reset, welcome and security
emails), a Mailpit SMTP server. Both are defined in `compose.yaml`.

- `docker compose up -d --wait`: starts the `postgres` and `mailpit` containers
- `npm run db:migrate`: applies pending Drizzle migrations (`drizzle-kit migrate`)
- `npm run db:generate`: generates new Drizzle migrations from schema changes (`drizzle-kit generate`)
- `NODE_ENV=development npm run db:seed`: creates the verified local accounts `admin@mail.com` (platform admin),
  `owner@mail.com` (owner of `acme` and of the empty `globex`) and `user@mail.com` (member of `acme`); passwords are in
  `src/lib/db/seeders/user.ts`
- `npm run auth:generate`: regenerates the Drizzle auth schema from the Better Auth config
- `docker compose down`: stops the local containers

Postgres listens on `127.0.0.1:5435` and Mailpit SMTP on `127.0.0.1:1026`. Mailpit's web UI is available at
<http://localhost:8025>; override the ports with `POSTGRES_PORT`, `MAILPIT_SMTP_PORT` and `MAILPIT_WEB_PORT` in `.env`.

## Release and deploy (Dokploy)

Pushing to `main` deploys nothing. Publishing a GitHub Release `vX.Y.Z` on `main` runs _Deploy (Dokploy)_: it builds
[`infrastructure/Dockerfile`](infrastructure/Dockerfile) once per commit and set of public values into
`ghcr.io/<owner>/<repository>:<sha>-<hash>`, moves `:production` to it, triggers the Dokploy application and waits until
`/healthz` returns the commit. Every container start runs `npm run db:migrate` before the server starts.

1. Go to **Releases → Draft a new release**.
2. Create a new tag like `v1.2.0` on `main` and click **Generate release notes**.
3. Click **Publish release**.

Something broke? Open the previous Release's _Deploy (Dokploy)_ run and click **Re-run all jobs**; the image is reused
unless `APP_URL` or `NEXT_PUBLIC_GTM_ID` changed since. Migrations are not rolled back, so a release with a breaking
migration needs a forward fix.

`NEXT_PUBLIC_*` values are baked into the image, so a change to them ships with the next release or re-run.

### One-time setup

- **GitHub** → Settings → Environments → `production` (deployment tags `v*`): variables `APP_URL` (the public base URL)
  and `NEXT_PUBLIC_GTM_ID`; secrets `DOKPLOY_URL`, `DOKPLOY_API_KEY`, `DOKPLOY_APPLICATION_ID`.
- **Dokploy** (one project per repository, next to its PostgreSQL): Application, provider Docker, image
  `ghcr.io/<owner>/<repository>:production` with the `ghcr.io` registry; Environment from the `# Google`, `# Auth`,
  `# Drizzle` and `# SMTP` sections of `.env.example`, with `DATABASE_URL` on the database's internal host; Domains on
  port `3000` with HTTPS; Redirects `www` → bare; Resources memory limit 512 MB.
- **Moving an existing database**: dump and restore it with the `drizzle` schema included, so the applied migrations in
  `drizzle.__drizzle_migrations` are kept and not run again.

## Commands for linting/fixing files

- `npm run lint`: runs the shared Oxlint and Oxfmt checks
- `npm run lint:ox`: lints JavaScript and TypeScript
    - `npm run lint:ox:fix`: fixes supported Oxlint findings
- `npm run format:ox`: formats supported repository files
    - `npm run format:ox:check`: checks formatting without writing files
- `npm run typecheck`: type-checks the project
- `npm run knip`: reports unused files, exports and dependencies
- `npm run verify:static`: runs typecheck, lint and Knip in one command
