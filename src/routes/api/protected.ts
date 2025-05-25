import { createAPIFileRoute } from '@tanstack/react-start/api';
import { Redis } from '@upstash/redis/cloudflare';

export const APIRoute = createAPIFileRoute('/api/protected')({
  GET: async ({ request, params }) => {
    return new Response(JSON.stringify({ message: 'protected' }));
  },
});
