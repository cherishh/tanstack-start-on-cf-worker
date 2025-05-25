import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import type { APIError } from 'better-auth';

export const APIRoute = createAPIFileRoute('/api/createAdmin')({
  POST: async ({ request }) => {
    const body = await request.json();
    const { name, email, password } = body;
    console.log(name, email, password, 'name, email, password');
    try {
      const newAdmin = await auth.api.setRole({
        body: {
          userId: 'PTkx92DjqEYzbgeltNxS7fAHfXEIczug',
          role: 'admin',
        },
      });
      console.log(newAdmin, 'newAdmin');
      return json(newAdmin);
    } catch (error: unknown) {
      console.log(error, 'error');
      return json({ error: error.status }, { status: error.statusCode });
    }
  },
});
