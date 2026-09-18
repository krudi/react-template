'use client';

import { authClient } from '@lib/auth/auth-client';
import { resetPasswordSchema } from '@lib/schemas/auth';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';

import { fieldA11yProps } from '../lib/field-errors';
import { AuthCard } from './auth-card';

type ResetPasswordFormProps = {
    token: string | null;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const router = useRouter();

    const form = useForm({
        defaultValues: { password: '' },
        validators: { onChange: resetPasswordSchema },
        onSubmit: async ({ value }) => {
            if (!token) {
                toast.error('The reset token is missing from the link. Request a new one.');
                return;
            }
            const { error } = await authClient.resetPassword({
                newPassword: value.password,
                token,
            });
            if (error) {
                toast.error(error.message ?? 'Failed to reset the password.');
                return;
            }
            toast.success('Password has been changed.');
            router.push('/sign-in');
        },
    });

    if (!token) {
        return (
            <AuthCard title="Invalid link">
                <p className="text-sm text-muted-foreground">This password reset link is invalid or has expired.</p>
                <Link
                    href="/forgot-password"
                    className="text-sm text-foreground underline underline-offset-4"
                >
                    Request a new link
                </Link>
            </AuthCard>
        );
    }

    return (
        <AuthCard
            title="Set a new password"
            description="Enter a new password for your account."
        >
            <form
                className="flex flex-col gap-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    void form.handleSubmit();
                }}
            >
                <form.Field name="password">
                    {(field) => {
                        const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                        return (
                            <Field data-invalid={invalid}>
                                <FieldLabel htmlFor={field.name}>New password</FieldLabel>
                                <PasswordInput
                                    id={field.name}
                                    name={field.name}
                                    autoComplete="new-password"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(event) => field.handleChange(event.target.value)}
                                    {...inputProps}
                                />
                                <FieldError
                                    id={errorId}
                                    errors={errors}
                                />
                            </Field>
                        );
                    }}
                </form.Field>

                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
                    {([canSubmit, isSubmitting]) => (
                        <Button
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting ? 'Saving...' : 'Set new password'}
                        </Button>
                    )}
                </form.Subscribe>
            </form>
        </AuthCard>
    );
}
