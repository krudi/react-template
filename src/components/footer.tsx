import Link from 'next/link';

import { Separator } from '@/components/ui/separator';

const year = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="py-8">
            <Separator className="mb-4" />

            <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
                <p>
                    &copy; {year}{' '}
                    <Link
                        href="/"
                        className="hover:text-foreground"
                    >
                        react-template
                    </Link>
                </p>

                <nav
                    aria-label="Footer"
                    className="flex items-center gap-4"
                >
                    <Link
                        href="/"
                        className="hover:text-foreground"
                    >
                        Home
                    </Link>
                    <Link
                        href="/sign-in"
                        className="hover:text-foreground"
                    >
                        Sign in
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
