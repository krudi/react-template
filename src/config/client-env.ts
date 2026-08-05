import { clientEnvironmentSchema } from '@lib/validation/environment';
import { createEnv } from '@t3-oss/env-nextjs';

/**
 * Zwalidowane zmienne dostępne w przeglądarce.
 *
 * `experimental__runtimeEnv` wypisujemy pole po polu, bo Next.js podmienia
 * `process.env.NEXT_PUBLIC_*` na etapie budowania tylko wtedy, gdy widzi
 * pełną nazwę w kodzie. Dynamiczny odczyt dałby `undefined`.
 */
export const clientEnv = createEnv({
    client: clientEnvironmentSchema,
    experimental__runtimeEnv: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    },
});
