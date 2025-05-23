import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/lib/db'; // your drizzle instance
import { username } from 'better-auth/plugins';
import { reactStartCookies } from 'better-auth/react-start';
import * as schema from './db/auth-schema';

export const auth = betterAuth({
  // emailAndPassword: {
  //   enabled: true,
  // },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  // plugins: [reactStartCookies()], // make sure this is the last plugin in the array
  // database: drizzleAdapter(db, {
  //   provider: 'pg',
  //   schema: { schema },
  // }),
});
