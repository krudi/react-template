FROM node:26.13.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages ./packages
RUN npm install --global "npm@$(node -p "require('./package.json').packageManager.split('@')[1]")" \
    && npm ci --no-audit --no-fund

COPY . .

ARG RELEASE_SHA=unknown
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GTM_ID=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID \
    NEXT_TELEMETRY_DISABLED=1

RUN printf '%s\n' "$RELEASE_SHA" > public/healthz \
    && BETTER_AUTH_URL="$NEXT_PUBLIC_SITE_URL" \
    BETTER_AUTH_SECRET=build-only-placeholder-secret-at-least-32-chars \
    DATABASE_URL=postgresql://build:build@build.invalid:5432/build \
    npm run build

FROM node:26.13.0-alpine

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package.json /app/drizzle.config.ts ./
COPY --from=build --chown=node:node /app/src/lib/db/migrations ./src/lib/db/migrations

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:3000/healthz || exit 1

CMD ["sh", "-c", "npm run db:migrate && exec node server.js"]
