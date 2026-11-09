'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';
import { acceptedCategory } from 'vanilla-cookieconsent';

import { googleConsent, initializeGoogleConsent } from './google-consent';
import { useConsentService } from './use-consent-service';

let started = false;
let containerStarted = false;

export function trackEvent(name: string, params: Record<string, string | number> = {}) {
    window.dataLayer ??= [];
    window.dataLayer.push({ event: name, ...params });
}

type GoogleTagManagerProps = {
    adsService: { service: string; category: string };
    analyticsService: { service: string; category: string };
    containerId: string;
};

export function GoogleTagManager({ adsService, analyticsService, containerId }: GoogleTagManagerProps) {
    const pathname = usePathname();
    const analytics = useConsentService(analyticsService.service, analyticsService.category);
    const advertising = useConsentService(adsService.service, adsService.category);
    const active = containerId !== '' && (analytics || advertising);

    useEffect(() => {
        if (!started) {
            initializeGoogleConsent();
            started = true;
        }
        const marketing = acceptedCategory(adsService.category);
        window.gtag?.(
            'consent',
            'update',
            googleConsent({
                analytics,
                advertising: marketing,
                adUserData: marketing,
                adPersonalization: marketing,
            })
        );
    }, [analytics, advertising, adsService.category]);

    useEffect(() => {
        if (active && !containerStarted) {
            containerStarted = true;
            trackEvent('gtm.js', { 'gtm.start': Date.now() });
        }
        if (active) {
            trackEvent('page_view', { page_path: pathname });
        }
    }, [active, pathname]);

    return active ? (
        <Script
            id="consent-google-tag-manager"
            src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`}
        />
    ) : null;
}
