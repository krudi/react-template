import { renderAuthEmailLayout } from './email-layout';
import type { AuthEmailTemplate } from './types';

interface PasswordResetEmailOptions {
    url: string;
}

export function createPasswordResetEmail({ url }: PasswordResetEmailOptions): AuthEmailTemplate {
    return {
        subject: 'Reset your password',
        text: `We received a request to reset your password.\n\nReset your password: ${url}\n\nThis link expires soon and can only be used once. If you did not request this, you can ignore this email.`,
        html: renderAuthEmailLayout({
            title: 'Reset your password',
            preheader: 'Use this secure link to choose a new password.',
            heading: 'Reset your password',
            paragraphs: [
                'We received a request to reset your password. Click the button below to choose a new one. This link expires soon and can only be used once.',
                "If you didn't request this, you can safely ignore this email — your password won't change.",
            ],
            action: { label: 'Reset password', url },
        }),
    };
}
