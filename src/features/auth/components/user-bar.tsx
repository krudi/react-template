'use client';

import { useSession } from '@lib/auth/auth-client';
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';

import { useSignOut } from '../lib/use-sign-out';

export function UserBar() {
    const { data: session } = useSession();
    const { signOut, isSigningOut } = useSignOut();

    if (!session) {
        return null;
    }

    return (
        <div className="flex items-center justify-end gap-3 text-sm text-muted-foreground">
            <span>{session.user.email}</span>
            <Link
                href="/account"
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
            >
                Account
            </Link>
            <Button
                variant="outline"
                size="sm"
                disabled={isSigningOut}
                onClick={() => void signOut()}
            >
                {isSigningOut ? 'Signing out...' : 'Sign out'}
            </Button>
        </div>
    );
}
