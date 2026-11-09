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
- `NODE_ENV=development npm run db:seed`: creates the verified local account `user@mail.com`
- `npm run auth:generate`: regenerates the Drizzle auth schema from the Better Auth config
- `docker compose down`: stops the local containers

Postgres listens on `127.0.0.1:5435` and Mailpit SMTP on `127.0.0.1:1026`. Mailpit's web UI is available at
<http://localhost:8025>; override the ports with `POSTGRES_PORT`, `MAILPIT_SMTP_PORT` and `MAILPIT_WEB_PORT` in `.env`.

## Release and deploy (Vercel)

One version space: `vX.Y.Z` tags on `main`, created by publishing a GitHub Release. Git pushes never deploy anything
(`vercel.json` turns Git deployments off, previews included); Vercel only receives builds from this workflow.

1. **Merge to `main`** and wait until its checks are green.
2. **Publish the Release**: Releases → _Draft a new release_ → new tag `vX.Y.Z`, target `main` → _Generate release
   notes_ → _Publish release_, or `gh release create v1.2.0 --target main --generate-notes`. The notes group pull
   requests by label ([`.github/release.yml`](.github/release.yml)).
3. **Check test**: _Deploy (Vercel)_ builds the release once and stages it as a production deployment without the domain
   (`vercel deploy --prebuilt --prod --skip-domain`); the run summary and the `test` environment link to its URL.
4. **Deploy production**: Actions → _Deploy (Vercel)_ → _Run workflow_ from `main`, version `vX.Y.Z`, or
   `gh workflow run deploy-vercel.yaml --ref main -f version=v1.2.0`. It promotes that staged build to the production
   domain without rebuilding. Running it with an older tag rolls back.

One-time setup per project: run `vercel link`, then add the repository variables `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`
(from `.vercel/project.json`) and the secret `VERCEL_TOKEN` (Vercel → Account Settings → Tokens). Environment variables
live in the Vercel project; the workflow pulls the production ones.

## Commands for linting/fixing files

- `npm run lint`: runs the shared Oxlint and Oxfmt checks
- `npm run lint:ox`: lints JavaScript and TypeScript
    - `npm run lint:ox:fix`: fixes supported Oxlint findings
- `npm run format:ox`: formats supported repository files
    - `npm run format:ox:check`: checks formatting without writing files
- `npm run typecheck`: type-checks the project
- `npm run knip`: reports unused files, exports and dependencies
- `npm run verify:static`: runs typecheck, lint and Knip in one command
