import { renderAuthEmailLayout } from './email-layout';
import type { AuthEmailTemplate } from './types';

export function createTwoFactorEnabledEmail(): AuthEmailTemplate {
    const description =
        "Two-factor authentication was just turned on for your account. You'll need your authenticator app or a backup code to sign in from now on. If this wasn't you, change your password immediately.";

    return {
        subject: 'Two-factor authentication was enabled',
        text: description,
        html: renderAuthEmailLayout({
            title: 'Two-factor authentication enabled',
            preheader: 'Two-factor authentication was just turned on.',
            heading: 'Two-factor authentication enabled',
            paragraphs: [description],
        }),
    };
}
