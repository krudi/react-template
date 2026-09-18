import { ACCEPTED_AVATAR_MIME_TYPES, MAX_AVATAR_DATA_URL_LENGTH } from '@config/uploads';
import { APIError } from 'better-auth';

const DATA_URL_MIME_PATTERN = /^data:([^;,]+);base64,/;

export function rejectInvalidAvatar(data: { image?: string | null | undefined }) {
    if (typeof data.image !== 'string') {
        return { data };
    }

    if (data.image.length > MAX_AVATAR_DATA_URL_LENGTH) {
        throw new APIError('BAD_REQUEST', { message: 'Profile picture is too large.' });
    }

    const mimeType = DATA_URL_MIME_PATTERN.exec(data.image)?.[1];
    if (!mimeType || !ACCEPTED_AVATAR_MIME_TYPES.has(mimeType)) {
        throw new APIError('BAD_REQUEST', { message: 'Profile picture must be a PNG, JPEG, WebP, or GIF image.' });
    }

    return { data };
}
