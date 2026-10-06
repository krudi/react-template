'use client';

import { Button, buttonVariants } from '@components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@components/ui/sheet';
import { useSignOut } from '@features/auth';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const NAV_ITEMS = [{ href: '/', label: 'Home' }] as const;

export type NavUser = { name: string } | null;

function isActiveHref(pathname: string, href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export function Navigation({ user, className }: { user: NavUser; className?: string }) {
    const pathname = usePathname();
    const { signOut, isSigningOut } = useSignOut();

    return (
        <div className={cn('flex items-center gap-2', className)}>
            <NavigationMenu className="max-w-none justify-start">
                <NavigationMenuList>
                    {NAV_ITEMS.map((item) => {
                        const active = isActiveHref(pathname, item.href);

                        return (
                            <NavigationMenuItem key={item.href}>
                                <NavigationMenuLink
                                    data-active={active || undefined}
                                    render={
                                        <Link
                                            href={item.href}
                                            aria-current={active ? 'page' : undefined}
                                        >
                                            {item.label}
                                        </Link>
                                    }
                                />
                            </NavigationMenuItem>
                        );
                    })}
                </NavigationMenuList>
            </NavigationMenu>

            {user ? (
                <>
                    <Link
                        href="/account"
                        aria-current={isActiveHref(pathname, '/account') ? 'page' : undefined}
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                    >
                        Account
                    </Link>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={isSigningOut}
                        onClick={() => void signOut()}
                    >
                        {isSigningOut ? 'Signing out...' : 'Sign out'}
                    </Button>
                </>
            ) : (
                <Link
                    href="/sign-in"
                    className={buttonVariants({ variant: 'default', size: 'sm' })}
                >
                    Sign in
                </Link>
            )}
        </div>
    );
}

export function MobileNavigation({ user, className }: { user: NavUser; className?: string }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { signOut, isSigningOut } = useSignOut();

    const items = user ? [...NAV_ITEMS, { href: '/account', label: 'Account' } as const] : NAV_ITEMS;

    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}
        >
            <SheetTrigger
                render={
                    <Button
                        variant="outline"
                        size="icon"
                        className={className}
                        aria-label="Open menu"
                    />
                }
            >
                <MenuIcon aria-hidden="true" />
            </SheetTrigger>

            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <nav
                    aria-label="Mobile"
                    className="flex flex-col gap-1 px-4"
                >
                    {items.map((item) => {
                        const active = isActiveHref(pathname, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                                    active && 'bg-muted text-foreground'
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto flex flex-col gap-2 p-4">
                    {user ? (
                        <Button
                            variant="outline"
                            disabled={isSigningOut}
                            onClick={() => {
                                setOpen(false);
                                void signOut();
                            }}
                        >
                            {isSigningOut ? 'Signing out...' : 'Sign out'}
                        </Button>
                    ) : (
                        <Link
                            href="/sign-in"
                            onClick={() => setOpen(false)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            Sign in
                        </Link>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
