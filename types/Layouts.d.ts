export interface RootLayoutProps {
    children: React.ReactNode
}

export interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}
