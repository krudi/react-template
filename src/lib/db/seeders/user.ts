import { db } from '@lib/db';
import { account, member, organization, user } from '@lib/db/schemas';
import { and, eq } from 'drizzle-orm';

import { isAlreadyExistsError } from './is-already-exists-error';
import { seederAuth } from './seeder-auth-instance';

type OrganizationRole = 'owner' | 'member';

interface FixtureUser {
    name: string;
    email: string;
    password: string;
    platformRole: 'admin' | 'user';
    memberships: Partial<Record<FixtureOrganizationSlug, OrganizationRole>>;
}

const FIXTURE_ORGANIZATIONS = [
    { name: 'Acme', slug: 'acme' },
    { name: 'Globex', slug: 'globex' },
] as const;

type FixtureOrganizationSlug = (typeof FIXTURE_ORGANIZATIONS)[number]['slug'];

const FIXTURE_USERS: FixtureUser[] = [
    {
        name: 'Platform Admin',
        email: 'admin@mail.com',
        password: '!5p!7qmiWeJFn6ldi4u7MKE#03n&HOz4',
        platformRole: 'admin',
        memberships: {},
    },
    {
        name: 'Owner',
        email: 'owner@mail.com',
        password: 've$rUnnV8e4U2^Jl8xO3JUdWdXJYZBRy',
        platformRole: 'user',
        memberships: { acme: 'owner', globex: 'owner' },
    },
    {
        name: 'User',
        email: 'user@mail.com',
        password: 'Dh49ectRFQwhKOEv$GO9$!F2AEBp$z$t',
        platformRole: 'user',
        memberships: { acme: 'member' },
    },
];

async function ensureUser(fixtureUser: FixtureUser): Promise<string> {
    const { name, email, password, platformRole } = fixtureUser;

    try {
        await seederAuth.api.signUpEmail({ body: { name, email, password } });
        console.log(`[seed] Created account: ${email}`);
    } catch (error: unknown) {
        if (!isAlreadyExistsError(error)) {
            throw error;
        }

        console.log(`[seed] Using existing account: ${email}`);
    }

    const [seededUser] = await db
        .update(user)
        .set({ name, role: platformRole })
        .where(eq(user.email, email))
        .returning({ id: user.id });

    if (!seededUser) {
        throw new Error(`[seed] Account not found after sign-up: ${email}`);
    }

    const authContext = await seederAuth.$context;
    await db
        .update(account)
        .set({ password: await authContext.password.hash(password) })
        .where(and(eq(account.userId, seededUser.id), eq(account.providerId, 'credential')));

    return seededUser.id;
}

async function ensureOrganization(fixture: (typeof FIXTURE_ORGANIZATIONS)[number], ownerId: string): Promise<string> {
    const [existing] = await db
        .select({ id: organization.id })
        .from(organization)
        .where(eq(organization.slug, fixture.slug));

    if (existing) {
        console.log(`[seed] Using existing organization: ${fixture.slug}`);
        return existing.id;
    }

    const created = await seederAuth.api.createOrganization({
        body: { name: fixture.name, slug: fixture.slug, userId: ownerId },
    });

    if (!created) {
        throw new Error(`[seed] Could not create organization: ${fixture.slug}`);
    }

    console.log(`[seed] Created organization: ${fixture.slug}`);
    return created.id;
}

async function ensureMember(organizationId: string, userId: string, role: OrganizationRole): Promise<void> {
    const [existing] = await db
        .select({ id: member.id })
        .from(member)
        .where(and(eq(member.organizationId, organizationId), eq(member.userId, userId)));

    if (existing) {
        await db.update(member).set({ role }).where(eq(member.id, existing.id));
        return;
    }

    await seederAuth.api.addMember({ body: { organizationId, userId, role } });
}

export async function seedUser(): Promise<void> {
    const userIds = new Map<string, string>();

    for (const fixtureUser of FIXTURE_USERS) {
        userIds.set(fixtureUser.email, await ensureUser(fixtureUser));
    }

    for (const fixtureOrganization of FIXTURE_ORGANIZATIONS) {
        const owner = FIXTURE_USERS.find(
            (fixtureUser) => fixtureUser.memberships[fixtureOrganization.slug] === 'owner'
        );
        const ownerId = owner ? userIds.get(owner.email) : undefined;

        if (!ownerId) {
            throw new Error(`[seed] Organization ${fixtureOrganization.slug} needs an owner`);
        }

        const organizationId = await ensureOrganization(fixtureOrganization, ownerId);

        for (const fixtureUser of FIXTURE_USERS) {
            const role = fixtureUser.memberships[fixtureOrganization.slug];
            const userId = userIds.get(fixtureUser.email);

            if (!userId) {
                continue;
            }

            if (role) {
                await ensureMember(organizationId, userId, role);
                console.log(`[seed] ${fixtureUser.email} is ${role} in ${fixtureOrganization.slug}`);
            } else {
                await db
                    .delete(member)
                    .where(and(eq(member.organizationId, organizationId), eq(member.userId, userId)));
            }
        }
    }
}
