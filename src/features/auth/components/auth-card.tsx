import type { ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type AuthCardProps = {
    title: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
};

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {children}
                    {footer}
                </CardContent>
            </Card>
        </div>
    );
}
