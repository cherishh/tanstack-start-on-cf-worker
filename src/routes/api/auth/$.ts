import { auth } from '@/lib/auth'; // import your auth instance
import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/api/auth/$')({
  GET: ({ request }) => {
    console.log(request, 'request GET');
    return auth.handler(request);
  },
  POST: ({ request }) => {
    console.log(request, 'request POST');
    return auth.handler(request);
  },
});
