import {
    sendBackupCodesRegeneratedEmail,
    sendPasswordChangedEmail,
    sendTwoFactorDisabledEmail,
    sendTwoFactorEnabledEmail,
} from '@lib/auth/emails';
import { sendNotificationSafely } from '@lib/auth/utils/notify';
import { createAuthMiddleware, isAPIError } from 'better-auth/api';

export const securityNotificationsHook = createAuthMiddleware(async (ctx) => {
    if (ctx.context.returned === undefined || isAPIError(ctx.context.returned)) {
        return;
    }

    const user = ctx.context.session?.user;

    if (!user) {
        return;
    }

    switch (ctx.path) {
        case '/change-password': {
            await sendNotificationSafely('password changed email', () => sendPasswordChangedEmail(user.email));
            return;
        }
        case '/two-factor/verify-totp': {
            if (user['twoFactorEnabled'] !== true) {
                await sendNotificationSafely('two-factor enabled email', () => sendTwoFactorEnabledEmail(user.email));
            }
            return;
        }
        case '/two-factor/disable': {
            await sendNotificationSafely('two-factor disabled email', () => sendTwoFactorDisabledEmail(user.email));
            return;
        }
        case '/two-factor/generate-backup-codes': {
            await sendNotificationSafely('backup codes regenerated email', () =>
                sendBackupCodesRegeneratedEmail(user.email)
            );
            return;
        }
        default: {
            return;
        }
    }
});
