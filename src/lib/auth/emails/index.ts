import { createBackupCodesRegeneratedEmail } from './backup-codes-regenerated-email';
import { createPasswordChangedEmail } from './password-changed-email';
import { createPasswordResetEmail } from './password-reset-email';
import { sendEmail } from './send';
import { createTwoFactorDisabledEmail } from './two-factor-disabled-email';
import { createTwoFactorEnabledEmail } from './two-factor-enabled-email';
import { createVerificationEmail } from './verification-email';
import { createWelcomeEmail } from './welcome-email';

export function sendResetPasswordEmail(to: string, url: string) {
    const template = createPasswordResetEmail({ url });
    return sendEmail({ to, ...template });
}

export function sendVerificationEmail(to: string, url: string) {
    const template = createVerificationEmail({ url });
    return sendEmail({ to, ...template });
}

export function sendWelcomeEmail(to: string, name: string, url: string) {
    const template = createWelcomeEmail({ name, url });
    return sendEmail({ to, ...template });
}

export function sendPasswordChangedEmail(to: string) {
    const template = createPasswordChangedEmail();
    return sendEmail({ to, ...template });
}

export function sendTwoFactorEnabledEmail(to: string) {
    const template = createTwoFactorEnabledEmail();
    return sendEmail({ to, ...template });
}

export function sendTwoFactorDisabledEmail(to: string) {
    const template = createTwoFactorDisabledEmail();
    return sendEmail({ to, ...template });
}

export function sendBackupCodesRegeneratedEmail(to: string) {
    const template = createBackupCodesRegeneratedEmail();
    return sendEmail({ to, ...template });
}
