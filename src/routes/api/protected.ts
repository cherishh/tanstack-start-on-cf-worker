import { createAPIFileRoute } from '@tanstack/react-start/api';
import { auth } from '@/lib/auth';
import { getWebRequest, setResponseStatus } from '@tanstack/react-start/server';

export const APIRoute = createAPIFileRoute('/api/protected')({
  GET: async ({ request, params }) => {
    const { headers } = getWebRequest()!;

    console.log('protected');
    const session = await auth.api.getSession({
      headers,
      query: {
        // ensure session is fresh
        // https://www.better-auth.com/docs/concepts/session-management#session-caching
        disableCookieCache: true,
      },
    });

    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    return new Response(JSON.stringify({ message: 'protected' }));
  },
});
