import { serverEnv } from '@config/server-env';

const SEEDABLE_NODE_ENVS = new Set(['development', 'test']);
const ALLOWED_DATABASE_HOSTS = new Set(['localhost', '127.0.0.1']);
const REQUIRED_DATABASE_PORT = '5435';
const REQUIRED_DATABASE_NAME = 'react_template_local_db';

function assertSeedableEnvironment(): void {
    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === undefined || !SEEDABLE_NODE_ENVS.has(nodeEnv)) {
        throw new Error(
            `Refusing to seed: NODE_ENV must be "development" or "test" (got ${nodeEnv ? `"${nodeEnv}"` : 'unset'}).`
        );
    }
}

function assertSeedableDatabase(): void {
    const { hostname, port, pathname } = new URL(serverEnv.DATABASE_URL);
    const databaseName = pathname.replace(/^\//, '');

    if (!ALLOWED_DATABASE_HOSTS.has(hostname)) {
        throw new Error(
            `Refusing to seed: DATABASE_URL host "${hostname}" is not loopback (expected localhost or 127.0.0.1).`
        );
    }

    if (port !== REQUIRED_DATABASE_PORT) {
        throw new Error(
            `Refusing to seed: DATABASE_URL port "${port}" does not match the expected local port (${REQUIRED_DATABASE_PORT}).`
        );
    }

    if (databaseName !== REQUIRED_DATABASE_NAME) {
        throw new Error(
            `Refusing to seed: DATABASE_URL database "${databaseName}" is not "${REQUIRED_DATABASE_NAME}".`
        );
    }
}

assertSeedableEnvironment();
assertSeedableDatabase();

const { closeDatabase } = await import('@lib/db');
const { seedUser } = await import('./user');

try {
    await seedUser();
} finally {
    await closeDatabase();
}
