import { twoFactorClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
    plugins: [
        twoFactorClient({
            onTwoFactorRedirect() {
                window.location.href = '/two-factor';
            },
        }),
    ],
});

export const { signIn, signOut, useSession, requestPasswordReset, resetPassword } = authClient;
