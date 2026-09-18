import { buttonVariants } from '@components/ui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="mx-auto flex min-h-[60svh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
            <h1 className="text-2xl font-semibold text-foreground">404 — Page not found</h1>
            <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
            <Link
                href="/"
                className={buttonVariants({ variant: 'outline' })}
            >
                Back to home
            </Link>
        </div>
    );
}
