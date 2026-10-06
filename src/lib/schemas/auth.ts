import { MIN_PASSWORD_LENGTH } from '@lib/auth/security';
import { z } from 'zod';

export const signInSchema = z.object({
    email: z.email('Enter a valid email address'),
    password: z.string().min(1, 'Enter your password'),
    rememberMe: z.boolean(),
});

export const signUpSchema = z
    .object({
        name: z.string().min(1, 'Enter your name'),
        email: z.email('Enter a valid email address'),
        password: z
            .string()
            .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`),
        confirmPassword: z.string().min(1, 'Confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const resendVerificationSchema = z.object({
    email: z.email('Enter a valid email address'),
});

export const forgotPasswordSchema = z.object({
    email: z.email('Enter a valid email address'),
});

export const resetPasswordSchema = z.object({
    password: z.string().min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`),
});

export const twoFactorCodeSchema = z.object({
    code: z.string().length(6, 'Code must be 6 digits').regex(/^\d+$/, 'Code may only contain digits'),
});

export const backupCodeSchema = z.object({
    code: z.string().min(1, 'Enter a backup code'),
});

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Enter your current password'),
        newPassword: z
            .string()
            .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`),
        confirmPassword: z.string().min(1, 'Confirm your new password'),
        revokeOtherSessions: z.boolean(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const updateNameSchema = z.object({
    name: z.string().min(1, 'Enter your name'),
});

export const twoFactorPasswordSchema = z.object({
    password: z.string().min(1, 'Enter your password'),
});

export const changeEmailSchema = z.object({
    newEmail: z.email('Enter a valid email address'),
});

export const deleteAccountSchema = z.object({
    password: z.string().min(1, 'Enter your password'),
});
