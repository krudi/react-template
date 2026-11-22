import { serverEnv } from '@config/server-env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schemas';

const globalForDatabase = globalThis as typeof globalThis & {
    databaseQueryClient?: ReturnType<typeof postgres> | undefined;
};

const queryClient = globalForDatabase.databaseQueryClient ?? postgres(serverEnv.DATABASE_URL);

if (process.env['NODE_ENV'] !== 'production') {
    globalForDatabase.databaseQueryClient = queryClient;
}

export const db = drizzle(queryClient, { schema });

export async function closeDatabase(): Promise<void> {
    await queryClient.end();
    globalForDatabase.databaseQueryClient = undefined;
}
