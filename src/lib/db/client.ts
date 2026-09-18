import { serverEnv } from '@config/server-env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schemas';

const queryClient = postgres(serverEnv.DATABASE_URL);

export const db = drizzle(queryClient, { schema });

export async function closeDatabase(): Promise<void> {
    await queryClient.end();
}
