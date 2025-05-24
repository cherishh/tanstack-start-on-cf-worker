import { eq } from 'drizzle-orm';
import { db } from '../index';
import { SelectPost, postsTable, likesTable } from '../schema/test-schema';

export async function updatePost(id: SelectPost['id'], data: Partial<Omit<SelectPost, 'id'>>) {
  await db.update(postsTable).set(data).where(eq(postsTable.id, id));
}

export async function updateLikesCount(count: number) {
  await db.update(likesTable).set({ count });
}
