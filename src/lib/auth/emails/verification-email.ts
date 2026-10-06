import { renderAuthEmailLayout } from './email-layout';
import type { AuthEmailTemplate } from './types';

interface VerificationEmailOptions {
    url: string;
}

export function createVerificationEmail({ url }: VerificationEmailOptions): AuthEmailTemplate {
    return {
        subject: 'Verify your email address',
        text: `Confirm this email address for your account.\n\nVerify email: ${url}\n\nThis link expires in one hour. If you did not request this, you can ignore this email.`,
        html: renderAuthEmailLayout({
            title: 'Verify your email address',
            preheader: 'Confirm this email address for your account.',
            heading: 'Verify your email address',
            paragraphs: [
                'Click the button below to confirm this email address for your account. This link expires in one hour.',
                "If you didn't request this, you can safely ignore this email.",
            ],
            action: { label: 'Verify email', url },
        }),
    };
}
