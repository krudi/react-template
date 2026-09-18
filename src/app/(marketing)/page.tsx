import { Badge } from '@components/ui/badge';
import { buttonVariants } from '@components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { getSession } from '@utils/auth/session';
import { createPageMetadata } from '@utils/site/seo';
import { KeyRound, Layers, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = createPageMetadata({
    path: '/',
    title: 'Homepage',
    description: 'A Next.js starter template built with React, Tailwind CSS v4, and shadcn/ui.',
    keywords: ['react template', 'next.js', 'homepage', 'starter'],
});

const FEATURES = [
    {
        icon: ShieldCheck,
        title: 'Authentication built in',
        description:
            'Email and password sign-in with optional two-factor authentication, powered by Better Auth and Drizzle ORM.',
    },
    {
        icon: KeyRound,
        title: 'Type-safe forms',
        description: 'Forms are built with TanStack Form and validated with Zod, end to end in TypeScript.',
    },
    {
        icon: Layers,
        title: 'shadcn/ui foundation',
        description: 'UI components are composed from shadcn/ui on Base UI primitives, styled with Tailwind CSS v4.',
    },
];

export default async function Page() {
    const session = await getSession();

    return (
        <div className="flex flex-col gap-16">
            <section className="flex flex-col items-center gap-6 py-8 text-center">
                <Badge variant="secondary">Next.js starter</Badge>

                <h1 className="max-w-2xl text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                    A clean starting point for your next project
                </h1>

                <p className="max-w-xl text-lg text-balance text-muted-foreground">
                    Next.js, TypeScript, and Tailwind CSS v4 with authentication, forms, and a shadcn/ui component
                    library already wired up — ready to customize.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    {session ? (
                        <Link
                            href="/account"
                            className={buttonVariants({ size: 'lg' })}
                        >
                            Go to your account
                        </Link>
                    ) : (
                        <Link
                            href="/sign-in"
                            className={buttonVariants({ size: 'lg' })}
                        >
                            Sign in
                        </Link>
                    )}

                    <a
                        href="https://github.com/krudi/react-template"
                        target="_blank"
                        rel="noreferrer"
                        className={buttonVariants({ variant: 'outline', size: 'lg' })}
                    >
                        View on GitHub
                    </a>
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-1 text-center">
                    <h2 className="text-2xl font-semibold text-foreground">What's included</h2>
                    <p className="text-muted-foreground">A short overview of what this template already provides.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {FEATURES.map(({ icon: Icon, title, description }) => (
                        <Card key={title}>
                            <CardHeader>
                                <Icon
                                    className="size-5 text-muted-foreground"
                                    aria-hidden="true"
                                />
                                <CardTitle className="mt-2">{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <Separator />

                <div className="flex flex-col gap-1 text-center">
                    <h2 className="text-2xl font-semibold text-foreground">Built with</h2>
                    <p className="text-muted-foreground">The stack this template is assembled from.</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Badge variant="outline">Next.js</Badge>
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Tailwind CSS v4</Badge>
                    <Badge variant="outline">shadcn/ui</Badge>
                    <Badge variant="outline">Base UI</Badge>
                    <Badge variant="outline">Better Auth</Badge>
                    <Badge variant="outline">Drizzle ORM</Badge>
                </div>
            </section>
        </div>
    );
}
