'use client';

import { authClient } from '@lib/auth/auth-client';
import { updateNameSchema } from '@lib/schemas/auth';
import { useForm } from '@tanstack/react-form';
import { X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { fieldA11yProps } from '../lib/field-errors';
import { convertImageToBase64, useImagePreview } from '../lib/use-image-preview';

type UpdateProfileFormProps = {
    currentName: string;
    currentImage: string | null;
};

export function UpdateProfileForm({ currentName, currentImage }: UpdateProfileFormProps) {
    const { image, imagePreview, handleImageChange, clearImage } = useImagePreview();

    const form = useForm({
        defaultValues: { name: currentName },
        validators: { onChange: updateNameSchema },
        onSubmit: async ({ value }) => {
            const { error } = await authClient.updateUser({
                name: value.name,
                image: image ? await convertImageToBase64(image) : undefined,
            });
            if (error) {
                toast.error(error.message ?? 'Failed to save profile.');
                return;
            }
            toast.success('Profile updated.');
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

            <Field>
                <FieldLabel htmlFor="profile-image">Profile picture</FieldLabel>
                <div className="flex items-end gap-4">
                    {(imagePreview ?? currentImage) && (
                        // eslint-disable-next-line @next/next/no-img-element -- local blob: preview or already-stored data URL, not an optimizable remote/static asset
                        <img
                            src={imagePreview ?? currentImage ?? ''}
                            alt="Profile"
                            className="size-16 rounded-sm object-cover"
                        />
                    )}
                    <div className="flex w-full items-center gap-2">
                        <Input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <button
                                type="button"
                                onClick={clearImage}
                                aria-label="Remove selected photo"
                            >
                                <X className="size-4" />
                            </button>
                        )}
                    </div>
                </div>
            </Field>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
                {([canSubmit, isSubmitting]) => (
                    <Button
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                        className="w-fit"
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                )}
            </form.Subscribe>
        </form>
    );
}
