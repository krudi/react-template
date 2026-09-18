'use client';

import { authClient } from '@lib/auth/auth-client';
import { twoFactorCodeSchema, twoFactorPasswordSchema } from '@lib/schemas/auth';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { PasswordInput } from '@/components/ui/password-input';

import { fieldA11yProps } from '../lib/field-errors';

type TwoFactorSettingsProps = {
    enabled: boolean;
};

type Step =
    | 'status'
    | 'enable-password'
    | 'enable-verify'
    | 'enable-backup-codes'
    | 'disable-password'
    | 'regenerate-password'
    | 'regenerate-backup-codes';

function BackupCodesList({ codes }: { codes: string[] }) {
    return (
        <ul className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-muted/30 p-4 font-mono text-sm">
            {codes.map((code) => (
                <li key={code}>{code}</li>
            ))}
        </ul>
    );
}

export function TwoFactorSettings({ enabled: initialEnabled }: TwoFactorSettingsProps) {
    const [enabled, setEnabled] = useState(initialEnabled);
    const [step, setStep] = useState<Step>('status');
    const [totpUri, setTotpUri] = useState('');
    const [backupCodes, setBackupCodes] = useState<string[]>([]);

    function resetTransientState() {
        setStep('status');
        setTotpUri('');
        setBackupCodes([]);
        passwordForm.reset();
        verifyForm.reset();
        disableForm.reset();
        regeneratePasswordForm.reset();
    }

    const passwordForm = useForm({
        defaultValues: { password: '' },
        validators: { onChange: twoFactorPasswordSchema },
        onSubmit: async ({ value }) => {
            const { data, error } = await authClient.twoFactor.enable({ password: value.password });
            if (error) {
                toast.error(error.message ?? 'Failed to start enabling 2FA.');
                return;
            }
            if (data.method !== 'totp') {
                toast.error('This app only supports verification through an authenticator app (TOTP).');
                return;
            }
            setTotpUri(data.totpURI);
            setBackupCodes(data.backupCodes ?? []);
            passwordForm.setFieldValue('password', '');
            setStep('enable-verify');
        },
    });

    const verifyForm = useForm({
        defaultValues: { code: '' },
        validators: { onChange: twoFactorCodeSchema },
        onSubmit: async ({ value }) => {
            const { error } = await authClient.twoFactor.verifyTotp({ code: value.code });
            if (error) {
                toast.error(error.message ?? 'Invalid code.');
                verifyForm.setFieldValue('code', '');
                return;
            }
            setEnabled(true);
            setTotpUri('');
            setStep('enable-backup-codes');
        },
    });

    const disableForm = useForm({
        defaultValues: { password: '' },
        validators: { onChange: twoFactorPasswordSchema },
        onSubmit: async ({ value }) => {
            const { error } = await authClient.twoFactor.disable({ password: value.password });
            if (error) {
                toast.error(error.message ?? 'Failed to disable 2FA.');
                return;
            }
            toast.success('2FA disabled.');
            setEnabled(false);
            resetTransientState();
        },
    });

    const regeneratePasswordForm = useForm({
        defaultValues: { password: '' },
        validators: { onChange: twoFactorPasswordSchema },
        onSubmit: async ({ value }) => {
            const { data, error } = await authClient.twoFactor.generateBackupCodes({ password: value.password });
            if (error) {
                toast.error(error.message ?? 'Failed to generate new backup codes.');
                return;
            }
            regeneratePasswordForm.setFieldValue('password', '');
            setBackupCodes(data.backupCodes ?? []);
            setStep('regenerate-backup-codes');
        },
    });

    if (step === 'enable-password') {
        return (
            <form
                className="flex flex-col gap-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    void passwordForm.handleSubmit();
                }}
            >
                <passwordForm.Field name="password">
                    {(field) => {
                        const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                        return (
                            <Field data-invalid={invalid}>
                                <FieldLabel htmlFor={field.name}>Confirm with your password</FieldLabel>
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
                </passwordForm.Field>
                <div className="flex gap-2">
                    <passwordForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
                        {([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                            >
                                {isSubmitting ? 'Checking...' : 'Next'}
                            </Button>
                        )}
                    </passwordForm.Subscribe>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={resetTransientState}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        );
    }

    if (step === 'enable-verify') {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center rounded-lg bg-white p-4">
                    <QRCode
                        value={totpUri}
                        size={180}
                    />
                </div>
                <p className="text-sm text-muted-foreground">
                    Scan the code with your authenticator app and enter the generated code.
                </p>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        void verifyForm.handleSubmit();
                    }}
                >
                    <verifyForm.Field name="code">
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
                    </verifyForm.Field>
                    <div className="flex gap-2">
                        <verifyForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
                            {([canSubmit, isSubmitting]) => (
                                <Button
                                    type="submit"
                                    disabled={!canSubmit || isSubmitting}
                                >
                                    {isSubmitting ? 'Verifying...' : 'Enable 2FA'}
                                </Button>
                            )}
                        </verifyForm.Subscribe>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={resetTransientState}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    if (step === 'enable-backup-codes' || step === 'regenerate-backup-codes') {
        return (
            <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                    Save these codes somewhere safe. Each one can be used only once to sign in if you lose access to
                    your authenticator app.{' '}
                    {step === 'regenerate-backup-codes' && 'Your previous backup codes no longer work.'}
                </p>
                <BackupCodesList codes={backupCodes} />
                <Button
                    type="button"
                    onClick={() => {
                        toast.success(step === 'enable-backup-codes' ? '2FA enabled.' : 'New backup codes saved.');
                        resetTransientState();
                    }}
                >
                    I've saved the codes, finish
                </Button>
            </div>
        );
    }

    if (step === 'disable-password') {
        return (
            <form
                className="flex flex-col gap-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    void disableForm.handleSubmit();
                }}
            >
                <disableForm.Field name="password">
                    {(field) => {
                        const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                        return (
                            <Field data-invalid={invalid}>
                                <FieldLabel htmlFor={field.name}>Confirm with your password</FieldLabel>
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
                </disableForm.Field>
                <div className="flex gap-2">
                    <disableForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
                        {([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={!canSubmit || isSubmitting}
                            >
                                {isSubmitting ? 'Disabling...' : 'Disable 2FA'}
                            </Button>
                        )}
                    </disableForm.Subscribe>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={resetTransientState}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        );
    }

    if (step === 'regenerate-password') {
        return (
            <form
                className="flex flex-col gap-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    void regeneratePasswordForm.handleSubmit();
                }}
            >
                <regeneratePasswordForm.Field name="password">
                    {(field) => {
                        const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                        return (
                            <Field data-invalid={invalid}>
                                <FieldLabel htmlFor={field.name}>Confirm with your password</FieldLabel>
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
                </regeneratePasswordForm.Field>
                <div className="flex gap-2">
                    <regeneratePasswordForm.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                            >
                                {isSubmitting ? 'Checking...' : 'Generate new codes'}
                            </Button>
                        )}
                    </regeneratePasswordForm.Subscribe>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={resetTransientState}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        );
    }

    return (
        <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
                {enabled ? 'Two-factor authentication is enabled.' : 'Two-factor authentication is disabled.'}
            </p>
            <div className="flex gap-2">
                {enabled && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setStep('regenerate-password')}
                    >
                        New backup codes
                    </Button>
                )}
                {enabled ? (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setStep('disable-password')}
                    >
                        Disable
                    </Button>
                ) : (
                    <Button
                        size="sm"
                        onClick={() => setStep('enable-password')}
                    >
                        Enable
                    </Button>
                )}
            </div>
        </div>
    );
}
