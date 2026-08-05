import { clientEnv } from '@config/client-env';

/** Publiczny adres serwisu. Walidowany przy starcie — patrz `@config/client-env`. */
export const siteUrl = clientEnv.NEXT_PUBLIC_SITE_URL;
