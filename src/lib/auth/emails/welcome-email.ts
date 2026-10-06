import { renderAuthEmailLayout } from './email-layout';
import type { AuthEmailTemplate } from './types';

interface WelcomeEmailOptions {
    name: string;
    url: string;
}

export function createWelcomeEmail({ name, url }: WelcomeEmailOptions): AuthEmailTemplate {
    return {
        subject: 'Welcome to React Template',
        text: `Welcome, ${name}.\n\nYour email address is verified and your account is ready: ${url}`,
        html: renderAuthEmailLayout({
            title: 'Welcome to React Template',
            preheader: 'Your account is ready.',
            heading: `Welcome, ${name}`,
            paragraphs: ['Your email address is verified and your account is ready.'],
            action: { label: 'Open React Template', url },
        }),
    };
}
