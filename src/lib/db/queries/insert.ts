import { db } from '../index';
import { InsertPost, InsertUser, postsTable, usersTable, likesTable } from '../schema/test-schema';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function createPost(data: InsertPost) {
  await db.insert(postsTable).values(data);
}

export async function insertLikesCount() {
  await db.insert(likesTable).values({ count: 1 });
}
