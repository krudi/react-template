import { z } from 'zod';

export const serverEnvironmentSchema = {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    SMTP_HOST: z.string().min(1).optional(),
    SMTP_PORT: z.coerce.number().int().positive().default(587),
    SMTP_USER: z.string().min(1).optional(),
    SMTP_PASSWORD: z.string().min(1).optional(),
    SMTP_FROM: z.email().optional(),
} as const;

export const clientEnvironmentSchema = {
    NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
} as const;
