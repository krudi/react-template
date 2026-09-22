'use client';

import '@app/globals.css';
import { Button } from '@components/ui/button';

export default function GlobalError({ reset }: { reset: () => void }) {
    return (
        <html lang="en">
            <body>
                <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
                    <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
                    <p className="text-muted-foreground">
                        An unexpected application error occurred. Try again — if the problem persists, come back later.
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => reset()}
                    >
                        Try again
                    </Button>
                </main>
            </body>
        </html>
    );
}
