# react-template

A template with [Next.js](https://nextjs.org) built on [React](https://reactjs.org) with focus on performance and best
practices.

## Quick start

> [!NOTE]
>
> You need [Node.js](https://github.com/nodejs) >= 24.19.0 (see `.nvmrc`) and npm >= 12.0.0 installed on your computer
> before running this project. [Docker](https://www.docker.com) (with Compose) is also required to run the local
> Postgres and Mailpit services.

1. First clone this repository and navigate into your project directory
2. `cp .env.example .env` - copy the **.env** file, then set `BETTER_AUTH_SECRET` (generate one with
   `npm run auth:secret`) and review the other variables (`DATABASE_URL`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_SITE_URL`,
   `SMTP_*`)
3. Install the dependencies: `npm install`
4. Start Postgres and Mailpit: `docker compose up -d && docker compose up -d --wait postgres mailpit`
5. Apply the database migrations: `npm run db:migrate`
6. Run the development server: `npm run dev`

## Database and email (Docker Compose)

This project uses [Docker Compose](https://docs.docker.com/compose) to run a local Postgres database and
[Mailpit](https://mailpit.axllent.org) (an SMTP catcher for previewing auth emails such as verification links and
password resets) during development. Postgres's first-run bootstrap variables (`POSTGRES_USER`, `POSTGRES_PASSWORD`,
`POSTGRES_DB`) are set directly to the application's own role and database (default `react_template_local` /
`react_template_local_db`) — a local-only trade-off that makes this role a superuser. The database is published only on
`127.0.0.1`, port `POSTGRES_PORT` (default `5435`).

- `docker compose up -d --wait postgres mailpit`: start Postgres and Mailpit
- `docker compose down`: stop and remove the containers
- `npm run db:generate`: generate a Drizzle migration from schema changes
- `npm run db:migrate`: apply pending migrations
- `npm run db:seed`: create a fixture development account (see [Authentication](#authentication))

_Mailpit's web UI is available at <http://localhost:8025> by default; connection details and ports can be overridden via
the variables in `.env`._

## Authentication

Authentication is handled by [Better Auth](https://www.better-auth.com) with email/password and two-factor sign-in. All
auth emails are sent over SMTP (`SMTP_*`); locally they land in Mailpit.

- **Sign-up** (`/sign-up`): self-serve sign-up is enabled and requires email verification
  (`requireEmailVerification: true`). Sign-up sends a verification link and shows `/verify-email` ("check your inbox",
  with a resend button). Opening the link verifies the address, signs the user in (`autoSignInAfterVerification: true`)
  and sends a welcome email.
- **Sign-in** (`/sign-in`): an unverified account cannot sign in; the form offers to resend the verification link.
- **Account** (`/account`): profile, email change, password change, two-factor settings, active sessions and account
  deletion. Changing the email sends a verification link to the new address; the old address stays active until the link
  is opened. Deleting the account asks for the password in a confirmation dialog.
- **Security notifications**: a Better Auth `hooks.after` middleware (`src/lib/auth/hooks/security-notifications.ts`)
  emails the user after a password change, enabling or disabling two-factor authentication, and regenerating backup
  codes. A failed send is logged and never fails the action itself.
- **Hardening** (`src/lib/auth/security.ts`): passwords need at least 12 characters, a password reset signs out every
  other session, and rate limits are stored in the database (`rate_limit` table) with tight per-endpoint rules for
  sign-in, sign-up, two-factor, password reset and verification emails. The app origin is always trusted; add extra
  origins as a comma-separated `BETTER_AUTH_TRUSTED_ORIGINS`. Cookies are `Secure` whenever `BETTER_AUTH_URL` uses
  https.
- **Route protection**: `src/proxy.ts` only does an optimistic session-cookie check on `/account`; every other route,
  including the auth pages, is public. Pages still verify the session on the server (`requireSession`).

`NODE_ENV=development npm run db:seed` creates one fixture account, `user@mail.com`, for local development and testing.
The account is created with a verified email address, so it can sign in straight away. The password is a fixed value
hardcoded in `src/lib/db/seeders/user.ts` — not published here or stored in any environment variable. It never modifies
an account that already exists: a fixture account seeded before email verification was required stays unverified, so use
the resend link on the sign-in page (the email arrives in Mailpit) or delete the row and seed again.

The seeder requires `NODE_ENV` to be exactly `development` — not `production`, not `test`, not unset — and separately
requires `DATABASE_URL` to point at exactly `react_template_local_db` on `localhost`/`127.0.0.1` port `5435` (the Docker
Compose service above), refusing to run otherwise. **Neither check is an absolute production safeguard on its own**:
`NODE_ENV` is a plain environment variable that can be overridden by whoever runs the command (including by accident,
e.g. `NODE_ENV=development` set in a shell profile or CI job), and the database-target check only protects against
seeding the _wrong_ database, not against someone deliberately pointing `DATABASE_URL` at a remote host that happens to
resolve locally (an SSH tunnel, for example). Together they catch accidental misuse; they do not replace keeping seeding
scripts out of production deploy paths entirely.

- `npm run auth:secret`: generate a value for `BETTER_AUTH_SECRET`
- `npm run auth:info`: print the resolved Better Auth configuration
- `npm run auth:generate`: regenerate the Drizzle auth schema from the Better Auth config
- `NODE_ENV=development npm run db:seed`: create the fixture development account described above

## Starting development mode

To launch the project in development mode with hot module replacement.

- `npm run dev`: to compile the [React](https://reactjs.org) application and serve it to the browser
- `npm run dev:turbo`: to compile faster in local development

_You can view the development server at <http://localhost:3000>_

## Starting production mode

Build and optimize the Next.js application for production.

- `npm run build`: build for production with minification

## Starting the project

Start the production server (after running `npm run build`).

- `npm run start`: starts a web-server with a preview of your project

## Commands for linting/fixing files

Navigate into your project directory and start linting your files.

- `npm run lint`: runs the shared Oxlint and Oxfmt checks
- `npm run lint:ox`: lints JavaScript and TypeScript
    - `npm run lint:ox:fix`: fixes supported Oxlint findings
- `npm run format:ox`: formats supported repository files
    - `npm run format:ox:check`: checks formatting without writing files
- `npm run typecheck`: type-checks the project
- `npm run knip`: reports unused files, exports and dependencies
- `npm run verify:static`: runs typecheck, lint and Knip in one command
- `npm run install:lefthook`: installs the Git hooks from `lefthook.yml` (once per clone)
