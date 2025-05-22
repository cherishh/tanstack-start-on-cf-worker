import { drizzle } from 'drizzle-orm/d1';
import { D1Database } from '@cloudflare/workers-types';
import { usersTable } from './schema';

export interface Env {
  DB: D1Database;
}
export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.DB);
    const users = await db.select().from(usersTable);
    const res = new Response(JSON.stringify(users));
    return res;
  },
};
