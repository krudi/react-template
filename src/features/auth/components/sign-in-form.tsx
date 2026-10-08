'use client';

import { authClient } from '@lib/auth/auth-client';
import { signInSchema } from '@lib/schemas/auth';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { fieldA11yProps } from '../lib/field-errors';
import { useResendVerificationEmail, verifyEmailPendingHref } from '../lib/use-resend-verification-email';
import { AuthCard } from './auth-card';
import { PasswordInput } from './password-input';

export function SignInForm() {
    const router = useRouter();
    const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
    const { resendVerificationEmail, isResending } = useResendVerificationEmail();

    async function handleResend(email: string) {
        if (await resendVerificationEmail(email)) {
            router.push(verifyEmailPendingHref(email));
        }
    }

    const form = useForm({
        defaultValues: { email: '', password: '', rememberMe: true },
        validators: { onChange: signInSchema },
        onSubmit: async ({ value }) => {
            const { data, error } = await authClient.signIn.email({
                email: value.email,
                password: value.password,
                rememberMe: value.rememberMe,
            });
            if (error) {
                if (error.code === 'EMAIL_NOT_VERIFIED') {
                    setUnverifiedEmail(value.email);
                    toast.error('Verify your email address before signing in.');
                    return;
                }
                setUnverifiedEmail(null);
                toast.error(error.message ?? 'Failed to sign in.');
                return;
            }
            if (data && 'twoFactorRedirect' in data && data.twoFactorRedirect) {
                return;
            }
            toast.success('Signed in.');
            router.push('/');
            router.refresh();
        },
    });

    return (
        <AuthCard
            title="Sign in"
            description="Enter your email and password to continue."
            footer={
                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/sign-up"
                        className="text-foreground underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                </p>
            }
        >
            {unverifiedEmail && (
                <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-3 text-sm">
                    <p className="text-muted-foreground">
                        Verify your email address before signing in. Check your inbox for the link, or request a new
                        one.
                    </p>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-fit"
                        disabled={isResending}
                        onClick={() => void handleResend(unverifiedEmail)}
                    >
                        {isResending ? 'Sending...' : 'Resend verification email'}
                    </Button>
                </div>
            )}

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

                <form.Field name="password">
                    {(field) => {
                        const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                        return (
                            <Field data-invalid={invalid}>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-muted-foreground underline underline-offset-4"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <PasswordInput
                                    id={field.name}
                                    name={field.name}
                                    autoComplete="current-password"
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

                <form.Field name="rememberMe">
                    {(field) => (
                        <Field orientation="horizontal">
                            <Checkbox
                                id={field.name}
                                checked={field.state.value}
                                onCheckedChange={(checked) => field.handleChange(checked)}
                            />
                            <FieldLabel
                                htmlFor={field.name}
                                className="font-normal"
                            >
                                Remember me
                            </FieldLabel>
                        </Field>
                    )}
                </form.Field>

                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
                    {([canSubmit, isSubmitting]) => (
                        <Button
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </Button>
                    )}
                </form.Subscribe>
            </form>
        </AuthCard>
    );
}
