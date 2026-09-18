import { clientEnvironmentSchema } from '@lib/validation/environment';
import { createEnv } from '@t3-oss/env-nextjs';

export const clientEnv = createEnv({
    client: clientEnvironmentSchema,
    experimental__runtimeEnv: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    },
});
