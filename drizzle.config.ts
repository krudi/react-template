import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/lib/db/schemas/index.ts',
    out: './src/lib/db/migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/app',
    },
});
