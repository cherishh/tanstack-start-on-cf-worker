- set secrets: `npx wrangler secret put UPSTASH_REDIS_REST_URL`
- add component: `pnpm dlx shadcn@canary add button`
- db: 
  - better-auth: `npx @better-auth/cli generate`
  - drizzle: `npx drizzle-kit generate` && `npx drizzle-kit migrate`
    1. first `npx @better-auth/cli generate` to create the schema
    2. then `npx drizzle-kit generate` to create the migrations
    3. then `npx drizzle-kit migrate` to apply

