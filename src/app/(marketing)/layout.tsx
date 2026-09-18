import { createPageMetadata } from '@utils/site/seo';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';

export const metadata: Metadata = createPageMetadata({});

export default function MarketingLayout({ children }: { children: ReactNode }) {
    return <div className="py-8">{children}</div>;
}
