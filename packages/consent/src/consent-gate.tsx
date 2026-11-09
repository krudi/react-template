'use client';

import { type ReactNode, useState } from 'react';
import { acceptService } from 'vanilla-cookieconsent';

import { useConsentService } from './use-consent-service';

import styles from './consent-gate.module.css';

type ConsentGateProps = {
    allowLabel: string;
    category: string;
    children: ReactNode;
    footer?: ReactNode;
    icon?: ReactNode;
    loadOnceLabel: string;
    notice: ReactNode;
    service: string;
};

export function ConsentGate({
    allowLabel,
    category,
    children,
    footer,
    icon,
    loadOnceLabel,
    notice,
    service,
}: ConsentGateProps) {
    const granted = useConsentService(service, category);
    const [loadedOnce, setLoadedOnce] = useState(false);

    if (granted || loadedOnce) {
        return <>{children}</>;
    }

    return (
        <div className={styles['gate']}>
            {icon}
            <p className={styles['text']}>{notice}</p>
            <div className={styles['actions']}>
                <button
                    type="button"
                    className={`${styles['button']} ${styles['button-primary']}`}
                    onClick={() => setLoadedOnce(true)}
                >
                    {loadOnceLabel}
                </button>
                <button
                    type="button"
                    className={styles['button']}
                    onClick={() => acceptService(service, category)}
                >
                    {allowLabel}
                </button>
            </div>
            {footer}
        </div>
    );
}
