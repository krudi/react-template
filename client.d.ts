declare module '*.css';

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NEXT_PUBLIC_SITE_URL?: string;
    }
}
