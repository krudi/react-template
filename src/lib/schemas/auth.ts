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
        password: z.string().min(8, 'Password must be at least 8 characters long'),
        confirmPassword: z.string().min(1, 'Confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const forgotPasswordSchema = z.object({
    email: z.email('Enter a valid email address'),
});

export const resetPasswordSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
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
        newPassword: z.string().min(8, 'Password must be at least 8 characters long'),
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

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
export type TwoFactorCodeValues = z.infer<typeof twoFactorCodeSchema>;
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
export type UpdateNameValues = z.infer<typeof updateNameSchema>;
export type TwoFactorPasswordValues = z.infer<typeof twoFactorPasswordSchema>;
export type BackupCodeValues = z.infer<typeof backupCodeSchema>;
