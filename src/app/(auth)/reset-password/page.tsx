import { ResetPasswordForm } from '@features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Set a new password', robots: { index: false, follow: false } };

type PageProps = {
    searchParams: Promise<{ token?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
    const { token } = await searchParams;
    return <ResetPasswordForm token={token ?? null} />;
}
