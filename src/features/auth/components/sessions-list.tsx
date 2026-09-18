'use client';

import { authClient } from '@lib/auth/auth-client';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

type SessionInfo = {
    id: string;
    token: string;
    createdAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
};

type SessionsListProps = {
    sessions: SessionInfo[];
    currentSessionToken: string;
};

export function SessionsList({ sessions, currentSessionToken }: SessionsListProps) {
    const [items, setItems] = useState(sessions);
    const [revokingToken, setRevokingToken] = useState<string | null>(null);

    async function handleRevoke(token: string) {
        setRevokingToken(token);
        const { error } = await authClient.revokeSession({ token });
        setRevokingToken(null);
        if (error) {
            toast.error(error.message ?? 'Failed to end session.');
            return;
        }
        setItems((current) => current.filter((session) => session.token !== token));
        toast.success('Session ended.');
    }

    return (
        <ul className="flex flex-col divide-y divide-border">
            {items.map((session) => (
                <li
                    key={session.id}
                    className="flex items-center justify-between gap-4 py-3"
                >
                    <div className="flex flex-col gap-0.5 text-sm">
                        <span className="font-medium text-foreground">
                            {session.token === currentSessionToken
                                ? 'This device'
                                : (session.userAgent ?? 'Unknown device')}
                        </span>
                        <span className="text-muted-foreground">
                            {session.ipAddress ?? 'Unknown IP address'} ·{' '}
                            {new Date(session.createdAt).toLocaleString('en-US')}
                        </span>
                    </div>
                    {session.token !== currentSessionToken && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => void handleRevoke(session.token)}
                            disabled={revokingToken === session.token}
                        >
                            {revokingToken === session.token ? 'Ending...' : 'End'}
                        </Button>
                    )}
                </li>
            ))}
        </ul>
    );
}
