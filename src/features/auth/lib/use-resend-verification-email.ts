'use client';

import { authClient } from '@lib/auth/auth-client';
import { useState } from 'react';
import { toast } from 'sonner';

export const EMAIL_VERIFIED_CALLBACK_URL = '/verify-email?status=verified';

export function verifyEmailPendingHref(email: string) {
    return `/verify-email?email=${encodeURIComponent(email)}`;
}

export function useResendVerificationEmail() {
    const [isResending, setIsResending] = useState(false);

    async function resendVerificationEmail(email: string): Promise<boolean> {
        setIsResending(true);
        const { error } = await authClient.sendVerificationEmail({
            email,
            callbackURL: EMAIL_VERIFIED_CALLBACK_URL,
        });
        setIsResending(false);

        if (error) {
            toast.error(error.message ?? 'Failed to send the verification email.');
            return false;
        }

        toast.success('If that account still needs verification, a new link is on its way.');
        return true;
    }

    return { resendVerificationEmail, isResending };
}
