export const MIN_PASSWORD_LENGTH = 12;

export const RATE_LIMIT_WINDOW_SECONDS = 60;
export const RATE_LIMIT_MAX = 100;
export const RATE_LIMIT_RULES = {
    '/sign-in/email': { window: 60, max: 5 },
    '/sign-up/email': { window: 3600, max: 5 },
    '/two-factor/verify-totp': { window: 60, max: 5 },
    '/two-factor/verify-backup-code': { window: 60, max: 5 },
    '/request-password-reset': { window: 900, max: 3 },
    '/reset-password': { window: 900, max: 5 },
    '/send-verification-email': { window: 900, max: 3 },
} as const;

export function trustedOrigins(baseUrl: string, configured: string | undefined): string[] {
    const extra = (configured ?? '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
    return [...new Set([new URL(baseUrl).origin, ...extra.map((origin) => new URL(origin).origin)])];
}

export function secureCookiesFor(baseUrl: string): boolean {
    return new URL(baseUrl).protocol === 'https:';
}
