import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { APIError } from 'better-auth';

export const APIRoute = createAPIFileRoute('/api/createAdmin')({
  POST: async ({ request }) => {
    const body = await request.json();
    const { name, email, password } = body;
    const parsed = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
      .safeParse(body);
    if (!parsed.success) {
      return json({ error: 'Invalid request' }, { status: 400 });
    }
    console.log(name, email, password, 'name, email, password');
    try {
      const newAdmin = await auth.api.createUser({
        body: {
          name,
          email,
          password,
          role: 'user',
        },
        headers: request.headers,
      });
      console.log(newAdmin, 'newAdmin');
      return json(newAdmin);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'status' in error && 'statusCode' in error) {
        return json({ error: (error as APIError).status }, { status: (error as APIError).statusCode });
      } else {
        return json({ error: 'Unknown error' }, { status: 500 });
      }
    }
  },
});
