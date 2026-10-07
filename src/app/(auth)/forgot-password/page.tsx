import { ForgotPasswordForm } from '@features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Forgot your password?', robots: { index: false, follow: false } };

export default function Page() {
    return <ForgotPasswordForm />;
}
