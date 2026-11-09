export type GoogleChoices = {
    analytics: boolean;
    advertising: boolean;
    adUserData: boolean;
    adPersonalization: boolean;
};

export function googleConsent(choices: GoogleChoices) {
    return {
        analytics_storage: choices.analytics ? 'granted' : 'denied',
        ad_storage: choices.advertising ? 'granted' : 'denied',
        ad_user_data: choices.advertising && choices.adUserData ? 'granted' : 'denied',
        ad_personalization: choices.advertising && choices.adPersonalization ? 'granted' : 'denied',
    };
}

export const deniedGoogleChoices: GoogleChoices = {
    analytics: false,
    advertising: false,
    adUserData: false,
    adPersonalization: false,
};

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function initializeGoogleConsent() {
    window.dataLayer ??= [];
    window.gtag ??= function () {
        window.dataLayer?.push(arguments);
    };
    window.gtag('consent', 'default', googleConsent(deniedGoogleChoices));
    window.gtag('set', 'ads_data_redaction', true);
    window.gtag('set', 'url_passthrough', false);
}
