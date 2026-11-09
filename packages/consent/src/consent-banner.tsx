'use client';

import 'vanilla-cookieconsent/dist/cookieconsent.css';
import { useEffect, useRef } from 'react';
import { acceptedCategory, type CookieConsentConfig, run, showPreferences } from 'vanilla-cookieconsent';

import styles from './consent-banner.module.css';

export function ConsentBanner({ config, settingsLabel }: { config: CookieConsentConfig; settingsLabel: string }) {
    const started = useRef(false);

    useEffect(() => {
        if (started.current) {
            return;
        }
        started.current = true;
        void run({
            ...config,
            root: '#cookie-consent-root',
            mode: 'opt-in',
            hideFromBots: true,
            onChange: ({ changedCategories }) => {
                if (changedCategories.some((category) => !acceptedCategory(category))) {
                    window.location.reload();
                }
            },
        });
    }, [config]);

    return (
        <div
            id="cookie-consent-root"
            className={styles['root']}
        >
            <button
                type="button"
                className={styles['reopen']}
                aria-label={settingsLabel}
                title={settingsLabel}
                onClick={() => showPreferences()}
            >
                <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-4-4 1 1 0 0 0-1-1Z" />
                    <circle
                        cx="8.5"
                        cy="12.5"
                        r="1"
                        fill="currentColor"
                    />
                    <circle
                        cx="12.5"
                        cy="16.5"
                        r="1"
                        fill="currentColor"
                    />
                    <circle
                        cx="15.5"
                        cy="12"
                        r="1"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    );
}
