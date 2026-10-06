'use client';

import { authClient } from '@lib/auth/auth-client';
import { signUpSchema } from '@lib/schemas/auth';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

import { fieldA11yProps } from '../lib/field-errors';
import { EMAIL_VERIFIED_CALLBACK_URL, verifyEmailPendingHref } from '../lib/use-resend-verification-email';
import { AuthCard } from './auth-card';

export function SignUpForm() {
    const router = useRouter();

    const form = useForm({
        defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
        validators: { onChange: signUpSchema },
        onSubmit: async ({ value }) => {
            const { error } = await authClient.signUp.email({
                name: value.name,
                email: value.email,
                password: value.password,
                callbackURL: EMAIL_VERIFIED_CALLBACK_URL,
            });
            if (error) {
                toast.error(error.message ?? 'Failed to create the account.');
                return;
            }
            router.push(verifyEmailPendingHref(value.email));
        },
    });

    return (
        <AuthCard
            title="Create an account"
            description="Enter your details to get started."
            footer={
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link
                        href="/sign-in"
                        className="text-foreground underline underline-offset-4"
                    >
                        Sign in
                    </Link>
                </p>
            }
        >
            <form
                className="flex flex-col gap-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    void form.handleSubmit();
                }}
            >
                <form.Field name="name">
                    {(field) => {
                        const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                        return (
                            <Field data-invalid={invalid}>
                                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    autoComplete="name"
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
                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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

                <form.Field name="confirmPassword">
                    {(field) => {
                        const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                        return (
                            <Field data-invalid={invalid}>
                                <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
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
                            {isSubmitting ? 'Creating account...' : 'Create account'}
                        </Button>
                    )}
                </form.Subscribe>
            </form>
        </AuthCard>
    );
}
