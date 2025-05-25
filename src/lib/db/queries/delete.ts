import { db } from '../index';
import { eq } from 'drizzle-orm';
import { SelectUser, usersTable } from '../schema/test-schema';

// do not use this. use better-auth instead.
export async function deleteUser(id: SelectUser['id']) {
  await db.delete(usersTable).where(eq(usersTable.id, id));
}
