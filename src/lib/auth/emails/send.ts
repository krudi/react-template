import { serverEnv } from '@config/server-env';
import { createTransport } from 'nodemailer';
import type { Transporter } from 'nodemailer';

type SendEmailInput = {
    to: string;
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
};

let cachedTransport: Transporter | null | undefined;

function getTransport(): Transporter | null {
    if (cachedTransport !== undefined) {
        return cachedTransport;
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = serverEnv;

    if (!SMTP_HOST || !SMTP_FROM) {
        cachedTransport = null;
        return cachedTransport;
    }

    cachedTransport = createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: SMTP_USER && SMTP_PASSWORD ? { user: SMTP_USER, pass: SMTP_PASSWORD } : undefined,
    });

    return cachedTransport;
}

export async function sendEmail({ to, subject, html, text, replyTo }: SendEmailInput): Promise<void> {
    const transport = getTransport();

    if (!transport) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('SMTP is not configured (SMTP_HOST, SMTP_FROM) — cannot send email in production.');
        }
        console.warn(`[email] SMTP not configured; skipped: "${subject}"`);
        return;
    }

    await transport.sendMail({ from: serverEnv.SMTP_FROM, to, subject, html, text, ...(replyTo ? { replyTo } : {}) });
}
