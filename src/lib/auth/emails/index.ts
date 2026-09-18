import { createPasswordResetEmail } from './password-reset-email';
import { sendEmail } from './send';

export type { AuthEmailTemplate } from './types';

export function sendResetPasswordEmail(to: string, url: string) {
    const template = createPasswordResetEmail({ url });
    return sendEmail({ to, ...template });
}
