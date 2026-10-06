'use client';

import { resendVerificationSchema } from '@lib/schemas/auth';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { fieldA11yProps } from '../lib/field-errors';
import { useResendVerificationEmail } from '../lib/use-resend-verification-email';
import { AuthCard } from './auth-card';

export type VerifyEmailState = 'pending' | 'verified' | 'email-changed' | 'invalid-link';

type VerifyEmailStatusProps = {
    state: VerifyEmailState;
    email: string;
};

function ResendVerificationForm({ email }: { email: string }) {
    const { resendVerificationEmail } = useResendVerificationEmail();

    const form = useForm({
        defaultValues: { email },
        validators: { onChange: resendVerificationSchema },
        onSubmit: async ({ value }) => {
            await resendVerificationEmail(value.email);
        },
    });

    return (
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
                        variant="outline"
                        disabled={!canSubmit || isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? 'Sending...' : 'Resend verification email'}
                    </Button>
                )}
            </form.Subscribe>
        </form>
    );
}

const backToSignIn = (
    <Link
        href="/sign-in"
        className="text-center text-sm text-foreground underline underline-offset-4"
    >
        Back to sign in
    </Link>
);

export function VerifyEmailStatus({ state, email }: VerifyEmailStatusProps) {
    if (state === 'verified') {
        return (
            <AuthCard
                title="Email verified"
                description="Your email address is confirmed and your account is ready."
            >
                <Link
                    href="/account"
                    className={buttonVariants({ className: 'w-full' })}
                >
                    Continue to your account
                </Link>
            </AuthCard>
        );
    }

    if (state === 'email-changed') {
        return (
            <AuthCard
                title="Email address updated"
                description="Your new email address is confirmed. Use it the next time you sign in."
            >
                <Link
                    href="/account"
                    className={buttonVariants({ className: 'w-full' })}
                >
                    Back to your account
                </Link>
            </AuthCard>
        );
    }

    if (state === 'invalid-link') {
        return (
            <AuthCard
                title="Invalid link"
                description="This verification link is invalid or has expired. Request a new one below."
                footer={backToSignIn}
            >
                <ResendVerificationForm email={email} />
            </AuthCard>
        );
    }

    return (
        <AuthCard
            title="Check your inbox"
            description={
                email
                    ? `We sent a verification link to ${email}. Open it to activate your account.`
                    : 'We sent you a verification link. Open it to activate your account.'
            }
            footer={backToSignIn}
        >
            <p className="text-sm text-muted-foreground">
                Didn&apos;t get the email? Check your spam folder or request a new link.
            </p>
            <ResendVerificationForm email={email} />
        </AuthCard>
    );
}
