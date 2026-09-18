import { getSession } from '@utils/auth/session';
import Link from 'next/link';

import { MobileNavigation, Navigation } from '@/components/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function Header() {
    const session = await getSession();
    const user = session?.user ? { name: session.user.name } : null;

    return (
        <header className="flex items-center justify-between gap-4 border-b border-border py-4">
            <Link
                href="/"
                className="text-lg font-semibold text-foreground"
            >
                react-template
            </Link>

            <div className="flex items-center gap-2">
                <Navigation
                    user={user}
                    className="hidden md:flex"
                />
                <ThemeToggle />
                <MobileNavigation
                    user={user}
                    className="md:hidden"
                />
            </div>
        </header>
    );
}
