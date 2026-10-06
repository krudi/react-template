'use client';

import { authClient } from '@lib/auth/auth-client';
import { backupCodeSchema, twoFactorCodeSchema } from '@lib/schemas/auth';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import { fieldA11yProps } from '../lib/field-errors';
import { AuthCard } from './auth-card';

export function TwoFactorForm() {
    const router = useRouter();
    const [useBackupCode, setUseBackupCode] = useState(false);

    const totpForm = useForm({
        defaultValues: { code: '' },
        validators: { onChange: twoFactorCodeSchema },
        onSubmit: async ({ value }) => {
            const { error } = await authClient.twoFactor.verifyTotp({ code: value.code });
            if (error) {
                toast.error(error.message ?? 'Invalid code.');
                totpForm.setFieldValue('code', '');
                return;
            }
            toast.success('Signed in.');
            router.push('/');
            router.refresh();
        },
    });

    const backupForm = useForm({
        defaultValues: { code: '' },
        validators: { onChange: backupCodeSchema },
        onSubmit: async ({ value }) => {
            const { error } = await authClient.twoFactor.verifyBackupCode({ code: value.code });
            if (error) {
                toast.error(error.message ?? 'Invalid backup code.');
                backupForm.setFieldValue('code', '');
                return;
            }
            toast.success("Signed in. This backup code has been used and won't work again.");
            router.push('/');
            router.refresh();
        },
    });

    return (
        <AuthCard
            title="Two-factor authentication"
            description={
                useBackupCode
                    ? 'Enter one of your backup recovery codes.'
                    : 'Enter the 6-digit code from your authenticator app.'
            }
        >
            {useBackupCode ? (
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        void backupForm.handleSubmit();
                    }}
                >
                    <backupForm.Field name="code">
                        {(field) => {
                            const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                            return (
                                <Field data-invalid={invalid}>
                                    <FieldLabel htmlFor={field.name}>Backup code</FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        autoComplete="one-time-code"
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
                    </backupForm.Field>

                    <backupForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
                        {([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting ? 'Verifying...' : 'Verify'}
                            </Button>
                        )}
                    </backupForm.Subscribe>
                </form>
            ) : (
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        void totpForm.handleSubmit();
                    }}
                >
                    <totpForm.Field name="code">
                        {(field) => {
                            const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                            return (
                                <Field data-invalid={invalid}>
                                    <FieldLabel htmlFor={field.name}>Code</FieldLabel>
                                    <InputOTP
                                        id={field.name}
                                        maxLength={6}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(value) => field.handleChange(value)}
                                        {...inputProps}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                    <FieldError
                                        id={errorId}
                                        errors={errors}
                                    />
                                </Field>
                            );
                        }}
                    </totpForm.Field>

                    <totpForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
                        {([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting ? 'Verifying...' : 'Verify'}
                            </Button>
                        )}
                    </totpForm.Subscribe>
                </form>
            )}

            <Button
                type="button"
                variant="ghost"
                className="h-auto w-full py-2 whitespace-normal"
                onClick={() => setUseBackupCode((current) => !current)}
            >
                {useBackupCode
                    ? 'Use the code from your authenticator app'
                    : "Don't have access to the app? Use a backup code"}
            </Button>
        </AuthCard>
    );
}
