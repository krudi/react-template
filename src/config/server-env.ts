import { serverEnvironmentSchema } from '@lib/validation/environment';
import { createEnv } from '@t3-oss/env-nextjs';

/**
 * Zwalidowane zmienne środowiskowe serwera.
 *
 * Brakująca albo literówkowa zmienna wywala aplikację przy starcie,
 * z czytelnym komunikatem — zamiast dawać błąd 500 przy pierwszym żądaniu,
 * które akurat jej potrzebowało. Szablon startuje bez zmiennych serwerowych;
 * kolejne dopisujemy w `@lib/validation/environment`.
 */
export const serverEnv = createEnv({
    server: serverEnvironmentSchema,
    emptyStringAsUndefined: true,
    experimental__runtimeEnv: process.env,
});
