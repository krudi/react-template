type ContentSecurityPolicyOptions = {
    development: boolean;
    https: boolean;
    allow?: Record<string, string[]>;
};

export function contentSecurityPolicy({ development, https, allow = {} }: ContentSecurityPolicyOptions): string {
    const directives: Record<string, string[]> = {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'", ...(development ? ["'unsafe-eval'"] : [])],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:', 'blob:'],
        'font-src': ["'self'"],
        'connect-src': ["'self'", ...(development ? ['ws:'] : [])],
        'media-src': ["'self'"],
        'object-src': ["'none'"],
        'frame-src': ["'none'"],
        'worker-src': ["'self'", 'blob:'],
        'manifest-src': ["'self'"],
        'base-uri': ["'self'"],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
    };
    for (const [name, values] of Object.entries(allow)) {
        directives[name] = [...(directives[name] ?? []).filter((value) => value !== "'none'"), ...values];
    }
    const policy = Object.entries(directives).map(([name, values]) => `${name} ${values.join(' ')}`);
    return [...policy, ...(https ? ['upgrade-insecure-requests'] : [])].join('; ');
}
