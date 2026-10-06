const EMAIL_ADDRESS_PATTERN = /[^\s<>"'@]+@[^\s<>"'@]+/g;

export async function sendNotificationSafely(label: string, send: () => Promise<void>): Promise<void> {
    try {
        await send();
    } catch (error) {
        const reason = error instanceof Error ? `${error.name}: ${error.message}` : 'Unknown error';
        console.error(`[email] Failed to send ${label}: ${reason.replace(EMAIL_ADDRESS_PATTERN, '[redacted]')}`);
    }
}
