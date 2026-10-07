import { SignUpForm } from '@features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Create an account', robots: { index: false, follow: false } };

export default function Page() {
    return <SignUpForm />;
}
