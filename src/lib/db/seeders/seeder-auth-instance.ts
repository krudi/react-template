import { serverEnv } from '@config/server-env';
import { db } from '@lib/db';
import * as schema from '@lib/db/schemas';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const seederAuth = betterAuth({
    secret: serverEnv.BETTER_AUTH_SECRET,
    baseURL: serverEnv.BETTER_AUTH_URL,
    database: drizzleAdapter(db, { provider: 'pg', schema }),
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => ({ data: { ...user, emailVerified: true } }),
            },
        },
    },
});
