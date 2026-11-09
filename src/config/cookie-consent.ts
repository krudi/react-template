import type { CookieConsentConfig, Translation } from '@krudi/consent';

export const consentTexts = { settings: 'Privacy settings' } as const;

const consentTranslation: Translation = {
    consentModal: {
        title: 'Your privacy',
        description:
            'We use cookies and similar tools only with your consent. Necessary ones keep the site working; the others help us improve it.',
        acceptAllBtn: 'Accept all',
        acceptNecessaryBtn: 'Reject all',
        showPreferencesBtn: 'Settings',
    },
    preferencesModal: {
        title: consentTexts.settings,
        acceptAllBtn: 'Accept all',
        acceptNecessaryBtn: 'Reject all',
        savePreferencesBtn: 'Save choices',
        closeIconLabel: 'Close settings',
        serviceCounterLabel: 'service|services',
        sections: [
            {
                title: 'Choose which tools may run',
                description:
                    'You can change this at any time with the button in the bottom-left corner. Withdrawing consent reloads the page to stop running services.',
            },
            {
                title: 'Necessary',
                description: 'Required for the site to work, such as remembering this choice for 180 days.',
                linkedCategory: 'necessary',
            },
            {
                title: 'Analytics',
                description:
                    'Google Analytics 4 (Google Ireland Limited) counts visits so we know which pages help. It stores the _ga and _ga_* cookies for 180 days; data may be transferred outside the EEA. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google privacy policy</a>.',
                linkedCategory: 'analytics',
            },
        ],
    },
};

export const consentServices = {
    analytics: { service: 'google-analytics', category: 'analytics' },
    ads: { service: 'google-ads', category: 'marketing' },
} as const;

export const consentConfig: CookieConsentConfig = {
    revision: 1,
    cookie: { name: 'app_consent', expiresAfterDays: 180 },
    guiOptions: {
        consentModal: { layout: 'box', position: 'bottom left', equalWeightButtons: true },
        preferencesModal: { layout: 'box', equalWeightButtons: true },
    },
    categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {
            services: {
                'google-analytics': { label: 'Google Analytics 4', cookies: [{ name: /^_ga(?:_|$)/ }] },
            },
        },
    },
    language: { default: 'en', translations: { en: consentTranslation } },
};
