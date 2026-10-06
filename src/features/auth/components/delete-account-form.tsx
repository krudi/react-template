'use client';

import { authClient } from '@lib/auth/auth-client';
import { deleteAccountSchema } from '@lib/schemas/auth';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import { fieldA11yProps } from '../lib/field-errors';

export function DeleteAccountForm() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const form = useForm({
        defaultValues: { password: '' },
        validators: { onChange: deleteAccountSchema },
        onSubmit: async ({ value }) => {
            const { error } = await authClient.deleteUser({ password: value.password });
            if (error) {
                toast.error(error.message ?? 'Failed to delete the account.');
                form.setFieldValue('password', '');
                return;
            }
            setOpen(false);
            toast.success('Your account has been deleted.');
            router.push('/');
            router.refresh();
        },
    });

    return (
        <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
                Permanently delete your account, sessions and two-factor settings. This cannot be undone.
            </p>
            <Sheet
                open={open}
                onOpenChange={(nextOpen) => {
                    setOpen(nextOpen);
                    if (!nextOpen) {
                        form.reset();
                    }
                }}
            >
                <SheetTrigger
                    render={
                        <Button
                            variant="destructive"
                            size="sm"
                        />
                    }
                >
                    Delete account
                </SheetTrigger>

                <SheetContent side="bottom">
                    <div className="mx-auto flex w-full max-w-md flex-col">
                        <SheetHeader>
                            <SheetTitle>Delete your account?</SheetTitle>
                            <SheetDescription>
                                This permanently deletes your account and signs you out everywhere. Enter your password
                                to confirm.
                            </SheetDescription>
                        </SheetHeader>

                        <form
                            className="flex flex-col"
                            onSubmit={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                void form.handleSubmit();
                            }}
                        >
                            <div className="px-4">
                                <form.Field name="password">
                                    {(field) => {
                                        const { errors, invalid, errorId, inputProps } = fieldA11yProps(field);
                                        return (
                                            <Field data-invalid={invalid}>
                                                <FieldLabel htmlFor="delete-account-password">Password</FieldLabel>
                                                <PasswordInput
                                                    id="delete-account-password"
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
                            </div>

                            <SheetFooter className="sm:flex-row sm:justify-end">
                                <SheetClose
                                    render={
                                        <Button
                                            type="button"
                                            variant="ghost"
                                        />
                                    }
                                >
                                    Cancel
                                </SheetClose>
                                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
                                    {([canSubmit, isSubmitting]) => (
                                        <Button
                                            type="submit"
                                            variant="destructive"
                                            disabled={!canSubmit || isSubmitting}
                                        >
                                            {isSubmitting ? 'Deleting...' : 'Delete account permanently'}
                                        </Button>
                                    )}
                                </form.Subscribe>
                            </SheetFooter>
                        </form>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
