'use client';

import { authClient } from '@lib/auth/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function useSignOut() {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    async function signOut() {
        setIsSigningOut(true);
        const { error } = await authClient.signOut();
        setIsSigningOut(false);

        if (error) {
            toast.error(error.message ?? 'Failed to sign out.');
            return;
        }

        toast.success('Signed out.');
        router.push('/sign-in');
        router.refresh();
    }

    return { signOut, isSigningOut };
}
