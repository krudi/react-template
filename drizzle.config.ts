import { defineConfig } from 'drizzle-kit';

const databaseUrl = process.env['DATABASE_URL'];

if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set. Copy .env.example to .env and fill it in.');
}

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/lib/db/schemas/index.ts',
    out: './src/lib/db/migrations',
    dbCredentials: {
        url: databaseUrl,
    },
});
