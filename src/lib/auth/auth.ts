import { serverEnv } from '@config/server-env';
import { sendResetPasswordEmail } from '@lib/auth/emails';
import { rejectInvalidAvatar } from '@lib/auth/utils/avatar';
import { db } from '@lib/db';
import * as schema from '@lib/db/schemas';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { twoFactor } from 'better-auth/plugins';

export const auth = betterAuth({
    secret: serverEnv.BETTER_AUTH_SECRET,
    baseURL: serverEnv.BETTER_AUTH_URL,
    database: drizzleAdapter(db, { provider: 'pg', schema }),
    emailAndPassword: {
        enabled: true,
        disableSignUp: true,
        requireEmailVerification: false,
        sendResetPassword: async ({ user, url }) => {
            await sendResetPasswordEmail(user.email, url);
        },
    },
    databaseHooks: {
        user: {
            update: {
                before: async (data) => rejectInvalidAvatar(data),
            },
        },
    },
    plugins: [twoFactor(), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
