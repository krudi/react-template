export async function sendNotificationSafely(label: string, send: () => Promise<void>): Promise<void> {
    try {
        await send();
    } catch (error) {
        console.error(`[email] Failed to send ${label}:`, error);
    }
}
