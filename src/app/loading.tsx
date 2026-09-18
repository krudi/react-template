import { Skeleton } from '@components/ui/skeleton';

export default function Loading() {
    return (
        <div
            className="flex flex-col gap-4 py-8"
            aria-busy="true"
            aria-live="polite"
        >
            <span className="sr-only">Loading…</span>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    );
}
