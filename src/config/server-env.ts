import { serverEnvironmentSchema } from '@lib/validation/environment';
import { createEnv } from '@t3-oss/env-nextjs';

export const serverEnv = createEnv({
    server: serverEnvironmentSchema,
    emptyStringAsUndefined: true,
    experimental__runtimeEnv: process.env,
});
