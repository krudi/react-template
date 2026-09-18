import { auth } from '@lib/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

export async function getSession() {
    return auth.api.getSession({ headers: await headers() });
}

export async function requireSession() {
    const session = await getSession();

    if (!session) {
        redirect('/sign-in');
    }

    return session;
}
