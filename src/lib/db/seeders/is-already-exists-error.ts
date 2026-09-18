export function isAlreadyExistsError(error: unknown): boolean {
    const errorCode =
        typeof error === 'object' && error !== null && 'body' in error
            ? (error as { body?: { code?: string } }).body?.code
            : undefined;

    return errorCode === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL';
}
