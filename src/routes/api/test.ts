import { createAPIFileRoute } from '@tanstack/react-start/api';
import { Redis } from '@upstash/redis/cloudflare';

export const APIRoute = createAPIFileRoute('/api/test')({
  GET: async ({ request, params, env }) => {
    const redis = Redis.fromEnv(
      env ?? {
        UPSTASH_REDIS_REST_URL: 'https://fine-grouper-27226.upstash.io',
        UPSTASH_REDIS_REST_TOKEN: 'AWpaAAIjcDFhM2NmYmJkYTU4YmM0MGIyYmEzYmE0MGI3OWU5NTdjM3AxMA',
      }
    );
    const count = await redis.incr('counter');
    return new Response(JSON.stringify({ count }));
  },
});
