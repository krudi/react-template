import { serverEnv } from '@config/server-env';
import { sendResetPasswordEmail, sendVerificationEmail, sendWelcomeEmail } from '@lib/auth/emails';
import { securityNotificationsHook } from '@lib/auth/hooks/security-notifications';
import {
    MIN_PASSWORD_LENGTH,
    RATE_LIMIT_MAX,
    RATE_LIMIT_RULES,
    RATE_LIMIT_WINDOW_SECONDS,
    secureCookiesFor,
    trustedOrigins,
} from '@lib/auth/security';
import { rejectInvalidAvatar } from '@lib/auth/utils/avatar';
import { sendNotificationSafely } from '@lib/auth/utils/notify';
import { isEmailChangeVerification } from '@lib/auth/utils/verification-token';
import { db } from '@lib/db';
import * as schema from '@lib/db/schemas';
import { siteUrl } from '@utils/site/site-url';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { twoFactor } from 'better-auth/plugins';

export const auth = betterAuth({
    secret: serverEnv.BETTER_AUTH_SECRET,
    baseURL: serverEnv.BETTER_AUTH_URL,
    database: drizzleAdapter(db, { provider: 'pg', schema }),
    trustedOrigins: trustedOrigins(serverEnv.BETTER_AUTH_URL, serverEnv.BETTER_AUTH_TRUSTED_ORIGINS),
    rateLimit: {
        enabled: true,
        storage: 'database',
        window: RATE_LIMIT_WINDOW_SECONDS,
        max: RATE_LIMIT_MAX,
        customRules: RATE_LIMIT_RULES,
    },
    advanced: {
        useSecureCookies: secureCookiesFor(serverEnv.BETTER_AUTH_URL),
    },
    emailAndPassword: {
        enabled: true,
        minPasswordLength: MIN_PASSWORD_LENGTH,
        revokeSessionsOnPasswordReset: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            await sendResetPasswordEmail(user.email, url);
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            await sendVerificationEmail(user.email, url);
        },
        afterEmailVerification: async (user, request) => {
            if (await isEmailChangeVerification(request, serverEnv.BETTER_AUTH_SECRET)) {
                return;
            }
            await sendNotificationSafely('welcome email', () => sendWelcomeEmail(user.email, user.name, siteUrl));
        },
    },
    user: {
        changeEmail: {
            enabled: true,
        },
        deleteUser: {
            enabled: true,
        },
    },
    databaseHooks: {
        user: {
            create: {
                before: async (data) => rejectInvalidAvatar(data),
            },
            update: {
                before: async (data) => rejectInvalidAvatar(data),
            },
        },
    },
    hooks: {
        after: securityNotificationsHook,
    },
    plugins: [twoFactor(), nextCookies()],
});
