type FormFieldError = { message?: string } | string | undefined;

function fieldErrors(errors: FormFieldError[]): Array<{ message?: string }> {
    return errors.map((error) => (typeof error === 'string' ? { message: error } : (error ?? {})));
}

export function visibleFieldErrors(field: {
    state: { meta: { isTouched: boolean; errors: FormFieldError[] } };
}): Array<{ message?: string }> {
    return field.state.meta.isTouched ? fieldErrors(field.state.meta.errors) : [];
}

export function fieldA11yProps(field: {
    name: string;
    state: { meta: { isTouched: boolean; errors: FormFieldError[] } };
}) {
    const errors = visibleFieldErrors(field);
    const invalid = errors.length > 0;
    const errorId = `${field.name}-error`;

    return {
        errors,
        invalid,
        errorId,
        inputProps: {
            'aria-invalid': invalid,
            'aria-describedby': invalid ? errorId : undefined,
        },
    };
}
