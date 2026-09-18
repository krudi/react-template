import { ForgotPasswordForm } from '@features/auth';
import { createPageMetadata } from '@utils/site/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    ...createPageMetadata({
        path: '/forgot-password',
        title: 'Forgot your password?',
    }),
    robots: { index: false, follow: false },
};

export default function Page() {
    return <ForgotPasswordForm />;
}
