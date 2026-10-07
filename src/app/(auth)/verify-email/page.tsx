import { VerifyEmailStatus } from '@features/auth';
import type { VerifyEmailState } from '@features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Verify your email', robots: { index: false, follow: false } };

type PageProps = {
    searchParams: Promise<{ email?: string; status?: string; error?: string }>;
};

function resolveState(status: string | undefined, error: string | undefined): VerifyEmailState {
    if (error) {
        return 'invalid-link';
    }
    if (status === 'verified' || status === 'email-changed') {
        return status;
    }
    return 'pending';
}

export default async function Page({ searchParams }: PageProps) {
    const { email, status, error } = await searchParams;

    return (
        <VerifyEmailStatus
            state={resolveState(status, error)}
            email={typeof email === 'string' ? email : ''}
        />
    );
}
