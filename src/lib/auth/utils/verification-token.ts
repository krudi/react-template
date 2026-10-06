import { verifyJWT } from 'better-auth/crypto';

type VerificationTokenPayload = {
    updateTo?: string;
};

export async function isEmailChangeVerification(request: Request | undefined, secret: string): Promise<boolean> {
    const token = request ? new URL(request.url).searchParams.get('token') : null;

    if (!token) {
        return false;
    }

    const payload = await verifyJWT<VerificationTokenPayload>(token, secret);

    return typeof payload?.updateTo === 'string';
}
