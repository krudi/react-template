import { SignInForm } from '@features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sign in', robots: { index: false, follow: false } };

export default function Page() {
    return <SignInForm />;
}
