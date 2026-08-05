import { z } from 'zod';

/**
 * Kształt zmiennych środowiskowych.
 *
 * Schemat stoi osobno od `src/config`, żeby dało się go użyć bez ładowania
 * `@t3-oss/env-nextjs` — na przykład w testach albo w skryptach jednorazowych.
 */

export const serverEnvironmentSchema = {} as const;

export const clientEnvironmentSchema = {
    /*
     * Adres publiczny serwisu — używany przez SEO i mapę strony.
     *
     * Ma wartość domyślną, bo szablon musi się zbudować bez żadnego `.env`.
     * W prawdziwym projekcie postawionym na tym szablonie warto ją usunąć
     * i wymusić ustawienie zmiennej na produkcji.
     */
    NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
} as const;
