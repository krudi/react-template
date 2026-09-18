'use client';

import { authClient } from '@lib/auth/auth-client';
import { forgotPasswordSchema } from '@lib/schemas/auth';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { fieldA11yProps } from '../lib/field-errors';
import { AuthCard } from './auth-card';

export function ForgotPasswordForm() {
    const [sent, setSent] = useState(false);

    const form = useForm({
        defaultValues: { email: '' },
        validators: { onChange: forgotPasswordSchema },
        onSubmit: async ({ value }) => {
            const { error } = await authClient.requestPasswordReset({
                email: value.email,
                redirectTo: '/reset-password',
            });
            if (error) {
                toast.error(error.message ?? 'Failed to send the reset link.');
                return;
            }
            setSent(true);
        },
    });

    if (sent) {
        return (
            <AuthCard title="Check your email">
                <p className="text-sm text-muted-foreground">
                    If that email address exists in our records, we&apos;ve sent a password reset link to it.
                </p>
                <Link
                    href="/sign-in"
                    className="text-sm text-foreground underline underline-offset-4"
                >
                    Back to sign in
                </Link>
            </AuthCard>
        );
    }

    return (
        <AuthCard
            title="Forgot your password?"
            description="Enter the email address we should send the password reset link to."
        >
            <form
                className="flex flex-col gap-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    void form.handleSubmit();
                }}
            >
                <form.Field name="email">
                    {(field) => {
                        const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                        return (
                            <Field data-invalid={invalid}>
                                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="email"
                                    autoComplete="email"
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
                            {isSubmitting ? 'Sending...' : 'Send reset link'}
                        </Button>
                    )}
                </form.Subscribe>
            </form>
        </AuthCard>
    );
}
