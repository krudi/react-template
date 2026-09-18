import { TwoFactorForm } from '@features/auth';
import { createPageMetadata } from '@utils/site/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    ...createPageMetadata({
        path: '/two-factor',
        title: 'Two-factor authentication',
    }),
    robots: { index: false, follow: false },
};

export default function Page() {
    return <TwoFactorForm />;
}
