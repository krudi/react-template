import { ACCEPTED_AVATAR_MIME_TYPES, MAX_AVATAR_FILE_BYTES } from '@config/uploads';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { toast } from 'sonner';

export function useImagePreview() {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const imagePreviewRef = useRef<string | null>(null);

    useEffect(() => {
        imagePreviewRef.current = imagePreview;
    }, [imagePreview]);

    useEffect(() => {
        return () => {
            if (imagePreviewRef.current) {
                URL.revokeObjectURL(imagePreviewRef.current);
            }
        };
    }, []);

    const handleImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) {
            return;
        }
        if (!ACCEPTED_AVATAR_MIME_TYPES.has(file.type)) {
            toast.error('Choose a PNG, JPEG, WebP, or GIF image file.');
            return;
        }
        if (file.size > MAX_AVATAR_FILE_BYTES) {
            toast.error(`The image is too large (max ${Math.round(MAX_AVATAR_FILE_BYTES / 1_000_000)}MB).`);
            return;
        }
        setImage(file);
        setImagePreview((preview) => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
            return URL.createObjectURL(file);
        });
    }, []);

    const clearImage = useCallback(() => {
        setImagePreview((preview) => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
            return null;
        });
        setImage(null);
    }, []);

    return { image, imagePreview, handleImageChange, clearImage };
}

export function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : '');
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
