'use client';

import { useSyncExternalStore } from 'react';
import { acceptedService, validConsent } from 'vanilla-cookieconsent';

function subscribe(listener: () => void) {
    window.addEventListener('cc:onConsent', listener);
    window.addEventListener('cc:onChange', listener);
    return () => {
        window.removeEventListener('cc:onConsent', listener);
        window.removeEventListener('cc:onChange', listener);
    };
}

export function useConsentService(service: string, category: string) {
    return useSyncExternalStore(
        subscribe,
        () => validConsent() && acceptedService(service, category),
        () => false
    );
}
