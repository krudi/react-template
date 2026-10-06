import { SignUpForm } from '@features/auth';
import { createPageMetadata } from '@utils/site/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    ...createPageMetadata({
        path: '/sign-up',
        title: 'Create an account',
    }),
    robots: { index: false, follow: false },
};

export default function Page() {
    return <SignUpForm />;
}
