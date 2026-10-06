import { renderAuthEmailLayout } from './email-layout';
import type { AuthEmailTemplate } from './types';

export function createPasswordChangedEmail(): AuthEmailTemplate {
    const description =
        "This is a confirmation that your password was just changed. If this wasn't you, reset your password immediately and review your active sessions.";

    return {
        subject: 'Your password was changed',
        text: description,
        html: renderAuthEmailLayout({
            title: 'Your password was changed',
            preheader: 'Confirming a recent password change.',
            heading: 'Your password was changed',
            paragraphs: [description],
        }),
    };
}
