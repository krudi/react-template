'use client';

import { clientEnv } from '@config/client-env';
import { consentConfig, consentServices, consentTexts } from '@config/cookie-consent';
import { ConsentBanner, GoogleTagManager } from '@krudi/consent';
import { usePathname } from 'next/navigation';

import styles from './privacy-controls.module.css';

export function PrivacyControls() {
    const isInternal = /^\/(account|sign-in|sign-up|forgot-password|reset-password|two-factor|verify-email)(\/|$)/.test(
        usePathname()
    );

    if (clientEnv.NEXT_PUBLIC_GTM_ID === '') {
        return null;
    }

    return (
        <div className={styles['controls']}>
            <ConsentBanner
                config={consentConfig}
                settingsLabel={consentTexts.settings}
            />
            {isInternal ? null : (
                <GoogleTagManager
                    containerId={clientEnv.NEXT_PUBLIC_GTM_ID}
                    analyticsService={consentServices.analytics}
                    adsService={consentServices.ads}
                />
            )}
        </div>
    );
}
