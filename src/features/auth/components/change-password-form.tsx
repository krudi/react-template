'use client';

import { authClient } from '@lib/auth/auth-client';
import { changePasswordSchema } from '@lib/schemas/auth';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';

import { fieldA11yProps } from '../lib/field-errors';

export function ChangePasswordForm() {
    const router = useRouter();

    const form = useForm({
        defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '', revokeOtherSessions: false },
        validators: { onChange: changePasswordSchema },
        onSubmit: async ({ value }) => {
            const { error } = await authClient.changePassword({
                currentPassword: value.currentPassword,
                newPassword: value.newPassword,
                revokeOtherSessions: value.revokeOtherSessions,
            });
            if (error) {
                toast.error(error.message ?? 'Failed to change the password.');
                return;
            }
            toast.success('Password changed.');
            form.reset();
            if (value.revokeOtherSessions) {
                router.refresh();
            }
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
            <form.Field name="currentPassword">
                {(field) => {
                    const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                    return (
                        <Field data-invalid={invalid}>
                            <FieldLabel htmlFor={field.name}>Current password</FieldLabel>
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

            <form.Field name="newPassword">
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

            <form.Field name="confirmPassword">
                {(field) => {
                    const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                    return (
                        <Field data-invalid={invalid}>
                            <FieldLabel htmlFor={field.name}>Confirm new password</FieldLabel>
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

            <form.Field name="revokeOtherSessions">
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
                            Sign out of other devices
                        </FieldLabel>
                    </Field>
                )}
            </form.Field>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
                {([canSubmit, isSubmitting]) => (
                    <Button
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                        className="w-fit"
                    >
                        {isSubmitting ? 'Saving...' : 'Change password'}
                    </Button>
                )}
            </form.Subscribe>
        </form>
    );
}
