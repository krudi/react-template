'use client';

import { Button } from '@components/ui/button';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div className="mx-auto flex min-h-[60svh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
            <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground">
                We couldn't load this page. Try again — if the problem persists, come back later.
            </p>
            <Button
                variant="outline"
                onClick={() => reset()}
            >
                Try again
            </Button>
        </div>
    );
}
