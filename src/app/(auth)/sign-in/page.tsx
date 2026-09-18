import { SignInForm } from '@features/auth';
import { createPageMetadata } from '@utils/site/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    ...createPageMetadata({
        path: '/sign-in',
        title: 'Sign in',
    }),
    robots: { index: false, follow: false },
};

export default function Page() {
    return <SignInForm />;
}
