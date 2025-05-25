import { createFileRoute, useRouter, redirect, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getLikesCount, getFakeUserById } from '../../lib/db/queries/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FancyProgress from '@/components/fancy-progress';
import { useState, useEffect } from 'react';
import { BASE_URL } from '@/utils/base-url';
import { updateLikesCount } from '../../lib/db/queries/update';
import { useQuery } from '@tanstack/react-query';

const getUserServerFn = createServerFn({ method: 'GET' })
  .validator((d: number) => d)
  .handler(({ data: id }) => {
    return getFakeUserById(id);
  });

const getLikesCountServerFn = createServerFn({ method: 'GET' }).handler(() => {
  return getLikesCount();
});

const addLikesCountServerFn = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(({ data: count }) => {
    return updateLikesCount(count);
  });

export const Route = createFileRoute('/user/')({
  beforeLoad: async ({ context }) => {
    console.log('before load - user index', context.user);
    // TODO: 神奇，如果注释掉下面 if，则上面 console 取到 user 为空。如果加上 if，则又能取到。
    if (!context.user) {
      throw redirect({ to: '/' });
    }
  },
  loader: async ({ context }) => {
    const userPromise = getUserServerFn({ data: 1 });
    const likesPromise = getLikesCountServerFn();
    const [user, likes] = await Promise.all([userPromise, likesPromise]);
    return { user, likes };
  },
  component: RouteComponent,
  errorComponent: () => <div>error</div>,
});

function RouteComponent() {
  const router = useRouter();
  const { user, likes } = Route.useLoaderData();
  const [pending, setPending] = useState(false);

  const {
    isPending,
    error,
    isError,
    data: count,
  } = useQuery({
    queryKey: ['user.count'],
    queryFn: () => fetch(`${BASE_URL}/api/test`).then(res => res.json()),
  });

  return (
    <div>
      <h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </h2>
      <h2>
        <pre>{isPending ? 'loading...' : isError ? 'error!' : JSON.stringify(count, null, 2)}</pre>
      </h2>
      <div>
        <div>likes: {likes}</div>
        <Button
          disabled={pending}
          onClick={async () => {
            setPending(true);
            await addLikesCountServerFn({ data: likes + 1 });
            await router.invalidate();
            setPending(false);
          }}
        >
          👍
        </Button>
      </div>
      <Link to='/user/deprecated'>deprecated</Link>
    </div>
  );
}
