import { renderAuthEmailLayout } from './email-layout';
import type { AuthEmailTemplate } from './types';

export function createBackupCodesRegeneratedEmail(): AuthEmailTemplate {
    const description =
        "A new set of two-factor backup codes was just generated for your account. Your previous backup codes no longer work. If this wasn't you, change your password immediately.";

    return {
        subject: 'Your backup codes were regenerated',
        text: description,
        html: renderAuthEmailLayout({
            title: 'Backup codes regenerated',
            preheader: 'Your two-factor backup codes were just regenerated.',
            heading: 'Backup codes regenerated',
            paragraphs: [description],
        }),
    };
}
