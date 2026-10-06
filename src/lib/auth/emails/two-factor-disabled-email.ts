import { renderAuthEmailLayout } from './email-layout';
import type { AuthEmailTemplate } from './types';

export function createTwoFactorDisabledEmail(): AuthEmailTemplate {
    const description =
        "Two-factor authentication was just turned off for your account, making it easier to sign in — and easier to break into if this wasn't you. If you didn't do this, change your password immediately and turn two-factor authentication back on.";

    return {
        subject: 'Two-factor authentication was disabled',
        text: description,
        html: renderAuthEmailLayout({
            title: 'Two-factor authentication disabled',
            preheader: 'Two-factor authentication was just turned off.',
            heading: 'Two-factor authentication disabled',
            paragraphs: [description],
        }),
    };
}
