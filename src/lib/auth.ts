import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/lib/db'; // your drizzle instance
import { reactStartCookies } from 'better-auth/react-start';
import * as schema from './db/schema/auth-schema';

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:3000', 'tanstack-start-on-workers-v0.tuxi.workers.dev'],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    admin({
      adminRoles: ['admin', 'superadmin'],
    }),
    reactStartCookies(),
  ], // make sure this is the last plugin in the array
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema: {
      verifications: schema.verification,
      sessions: schema.session,
      accounts: schema.account,
      users: schema.user,
    },
  }),
});
