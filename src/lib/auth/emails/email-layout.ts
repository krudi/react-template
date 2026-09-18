interface EmailAction {
    label: string;
    url: string;
}

interface AuthEmailLayoutOptions {
    action?: EmailAction;
    heading: string;
    paragraphs: string[];
    preheader: string;
    title: string;
}

function escapeHtml(value: string): string {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

export function renderAuthEmailLayout(options: AuthEmailLayoutOptions): string {
    const paragraphs = options.paragraphs
        .map(
            (paragraph) =>
                `<p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#4b5563;">${escapeHtml(paragraph)}</p>`
        )
        .join('');

    const action = options.action
        ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;">
        <tr>
            <td style="border-radius:8px;background:#111827;">
                <a href="${escapeHtml(options.action.url)}" target="_blank" style="display:inline-block;padding:12px 20px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">${escapeHtml(options.action.label)}</a>
            </td>
        </tr>
    </table>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;word-break:break-all;">If the button does not work, copy this link into your browser:<br><a href="${escapeHtml(options.action.url)}" style="color:#111827;">${escapeHtml(options.action.url)}</a></p>`
        : '';

    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${escapeHtml(options.title)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(options.preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;background:#f3f4f6;">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table role="presentation" width="420" cellpadding="0" cellspacing="0" style="width:100%;max-width:420px;background:#ffffff;border-radius:8px;">
                    <tr>
                        <td style="padding:32px;">
                            <p style="margin:0 0 24px;font-size:16px;font-weight:600;color:#111827;">React Template</p>
                            <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;color:#111827;">${escapeHtml(options.heading)}</h1>
                            ${paragraphs}
                            ${action}
                            <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;">
                            <p style="margin:0;font-size:12px;color:#6b7280;">You're receiving this because it's tied to your account. If you didn't expect this email, you can ignore it.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
