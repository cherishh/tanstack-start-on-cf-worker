import { db } from '../index';
import { InsertPost, InsertUser, postsTable, usersTable } from '../schema/test-schema';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function createPost(data: InsertPost) {
  await db.insert(postsTable).values(data);
}
