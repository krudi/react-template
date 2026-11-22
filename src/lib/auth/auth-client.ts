import { adminClient, organizationClient, twoFactorClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
    plugins: [
        twoFactorClient({
            onTwoFactorRedirect() {
                window.location.href = '/two-factor';
            },
        }),
        adminClient(),
        organizationClient(),
    ],
});

export const { useSession } = authClient;
