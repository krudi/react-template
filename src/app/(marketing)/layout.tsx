import '@styles/styles.css';

import { createPageMetadata } from '@utils/seo';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';

export const metadata: Metadata = createPageMetadata({});

export default function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <main
            className="main"
            aria-label="Main content"
        >
            {children}
        </main>
    );
}
