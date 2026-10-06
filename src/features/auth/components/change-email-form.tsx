'use client';

import { authClient } from '@lib/auth/auth-client';
import { changeEmailSchema } from '@lib/schemas/auth';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { fieldA11yProps } from '../lib/field-errors';

const EMAIL_CHANGED_CALLBACK_URL = '/verify-email?status=email-changed';

type ChangeEmailFormProps = {
    currentEmail: string;
};

export function ChangeEmailForm({ currentEmail }: ChangeEmailFormProps) {
    const form = useForm({
        defaultValues: { newEmail: '' },
        validators: { onChange: changeEmailSchema },
        onSubmit: async ({ value }) => {
            const { error } = await authClient.changeEmail({
                newEmail: value.newEmail,
                callbackURL: EMAIL_CHANGED_CALLBACK_URL,
            });
            if (error) {
                toast.error(error.message ?? 'Failed to change the email address.');
                return;
            }
            toast.success(`Check ${value.newEmail} for a link to confirm the change.`);
            form.reset();
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
            <form.Field name="newEmail">
                {(field) => {
                    const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                    return (
                        <Field data-invalid={invalid}>
                            <FieldLabel htmlFor={field.name}>New email address</FieldLabel>
                            <FieldDescription>
                                Your current address is {currentEmail}. It stays active until you confirm the new one
                                from the link we email you.
                            </FieldDescription>
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
                        className="w-fit"
                    >
                        {isSubmitting ? 'Sending...' : 'Change email'}
                    </Button>
                )}
            </form.Subscribe>
        </form>
    );
}
