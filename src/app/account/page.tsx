import { ChangePasswordForm, SessionsList, TwoFactorSettings, UpdateProfileForm, UserBar } from '@features/auth';
import { auth } from '@lib/auth/auth';
import { requireSession } from '@utils/auth/session';
import { createPageMetadata } from '@utils/site/seo';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
    ...createPageMetadata({
        path: '/account',
        title: 'Your account',
    }),
    robots: { index: false, follow: false },
};

export default async function Page() {
    const session = await requireSession();
    const sessions = await auth.api.listSessions({ headers: await headers() });

    return (
        <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-8 sm:px-6 lg:py-12">
            <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Link
                            href="/"
                            className="text-sm text-muted-foreground hover:text-foreground"
                        >
                            ← Home
                        </Link>
                        <h1 className="text-2xl font-semibold text-foreground">Your account</h1>
                    </div>
                    <UserBar />
                </div>
            </div>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-foreground">Profile</h2>
                <Separator />
                <UpdateProfileForm
                    currentName={session.user.name}
                    currentImage={session.user.image ?? null}
                />
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-foreground">Password</h2>
                <Separator />
                <ChangePasswordForm />
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-foreground">Two-factor authentication</h2>
                <Separator />
                <TwoFactorSettings enabled={Boolean(session.user.twoFactorEnabled)} />
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-foreground">Active sessions</h2>
                <Separator />
                <SessionsList
                    key={sessions.map((item) => item.id).join(',')}
                    sessions={sessions}
                    currentSessionToken={session.session.token}
                />
            </section>
        </div>
    );
}
