import { isAlreadyExistsError } from './is-already-exists-error';
import { seederAuth } from './seeder-auth-instance';

const FIXTURE_USER = {
    name: 'Test User',
    email: 'user@mail.com',
    password: 'A8kFz@9Ld&2pXr!W',
};

export async function seedUser(): Promise<void> {
    try {
        await seederAuth.api.signUpEmail({ body: FIXTURE_USER });
        console.log(`[seed] Created account: ${FIXTURE_USER.email}`);
    } catch (error: unknown) {
        if (!isAlreadyExistsError(error)) {
            throw error;
        }

        console.log(`[seed] Using existing account: ${FIXTURE_USER.email}`);
    }
}
