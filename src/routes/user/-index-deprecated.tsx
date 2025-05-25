import { createFileRoute, useRouter, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getLikesCount, getUserById } from '../../lib/db/queries/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FancyProgress from '@/components/fancy-progress';
import { useState, useEffect } from 'react';
import { BASE_URL } from '@/utils/base-url';
import { updateLikesCount } from '../../lib/db/queries/update';

const getUserServerFn = createServerFn({ method: 'GET' })
  .validator((d: number) => d)
  .handler(({ data: id }) => {
    return getUserById(id);
  });

const getLikesCountServerFn = createServerFn({ method: 'GET' }).handler(() => {
  return getLikesCount();
});

const addLikesCountServerFn = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(({ data: count }) => {
    return updateLikesCount(count);
  });

// const getCountServerFn = createServerFn({ method: 'GET' }).handler(async () => {
//   const res = await fetch(`${BASE_URL}/api/test`);
//   if (!res.ok) {
//     throw new Error(`api/test failed: ${res.status} ${res.statusText}`);
//   }
//   return res.json();
// });

export const Route = createFileRoute('/user/_index-deprecated')({
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
    /**
     * NOTE: 在Loader里面使用Fetch请求一个自己后段的接口 非常合理并且常见的一个场景。
     * 但实际测试会发现 本地开发的时候是完全OK的 但是build之后 在production环境 这个fetch请求会出错 并且也没有办法找出它具体的错误是什么
     * 稍微改一下 不要从loader里面直接 请求fetch 而是把它包装成一个Server fn 也就是在loader里面使用server action，server fn 再 fetch 自己的后端。结果仍然是不 work，并且明确有 serverFn internal error 的报错。
     * 这个问题大概率是跟Cloudflare平台有关系 因为在本地开发的时候是完全OK的 。
     * 可以work around 在前端直接用fetch请求后端
     * 但体验会降级 因为用户可以看到一个闪烁或者一个loading
     */
    // const count = await fetch(`${BASE_URL}/api/test`)
    //   .then(async res => {
    //     if (!res.ok) {
    //       let errorDetail;
    //       try {
    //         errorDetail = await res.json();
    //       } catch {
    //         errorDetail = await res.text();
    //       }
    //       throw new Error(`api/test failed: ${res.status} ${res.statusText} - ${JSON.stringify(errorDetail)}`);
    //     }
    //     return res;
    //   })
    //   .then(res => res.json())
    //   .catch(err => {
    //     console.error(err);
    //     console.error(`request url was ${BASE_URL}/api/test`);
    //     return err;
    //   });

    // const count = await getCountServerFn();

    // return { user, likes, count };
    return { user, likes };
  },
  component: RouteComponent,
  errorComponent: () => <div>error</div>,
});

function RouteComponent() {
  const router = useRouter();
  // const { user, count, likes } = Route.useLoaderData();
  const { user, likes }: any = Route.useLoaderData();
  const [pending, setPending] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`${'http://localhost:3000'}/api/test`)
      .then(res => res.json())
      .then(data => {
        setCount(data);
      });
  }, []);

  return (
    <div>
      <h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </h2>
      <h2>
        <pre>{JSON.stringify(count, null, 2)}</pre>
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
    </div>
  );
}

function ProgressCard() {
  const [progress, setProgress] = useState(35);
  const [autoProgress, setAutoProgress] = useState(0);

  // Auto increment progress for demo
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleIncrement = () => {
    setProgress(prev => Math.min(prev + 10, 100));
  };

  const handleDecrement = () => {
    setProgress(prev => Math.max(prev - 10, 0));
  };

  const handleReset = () => {
    setProgress(0);
  };

  return (
    <div>
      <hr className='my-4' />
      {/* <Invoice /> */}
      <div className='w-full max-w-3xl mx-auto p-4 space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>Fancy Progress Indicators</CardTitle>
            <CardDescription>Beautiful and customizable progress indicators for your application</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Interactive Demo</h3>
              <FancyProgress value={progress} label='Interactive Progress' />

              <div className='flex gap-2 mt-4'>
                <Button onClick={handleDecrement} variant='outline' size='sm'>
                  Decrease
                </Button>
                <Button onClick={handleIncrement} size='sm'>
                  Increase
                </Button>
                <Button onClick={handleReset} variant='ghost' size='sm'>
                  Reset
                </Button>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Auto-Animated Progress</h3>
              <FancyProgress value={100} autoAnimate label='Auto-Animated Progress' />
            </div>

            <Tabs defaultValue='gradient'>
              <TabsList className='grid grid-cols-4 mb-4'>
                <TabsTrigger value='gradient'>Gradient</TabsTrigger>
                <TabsTrigger value='glow'>Glow</TabsTrigger>
                <TabsTrigger value='steps'>Steps</TabsTrigger>
                <TabsTrigger value='minimal'>Minimal</TabsTrigger>
              </TabsList>

              <TabsContent value='gradient' className='space-y-4'>
                <FancyProgress value={75} variant='gradient' label='Gradient Style' />
                <FancyProgress value={100} variant='gradient' label='Completed' />
              </TabsContent>

              <TabsContent value='glow' className='space-y-4'>
                <FancyProgress value={60} variant='glow' label='Glow Effect' />
                <FancyProgress value={100} variant='glow' label='Completed' />
              </TabsContent>

              <TabsContent value='steps' className='space-y-4'>
                <FancyProgress value={45} variant='steps' label='Steps Style' />
                <FancyProgress value={100} variant='steps' label='Completed' />
              </TabsContent>

              <TabsContent value='minimal' className='space-y-4'>
                <FancyProgress value={30} variant='minimal' label='Minimal Style' />
                <FancyProgress value={100} variant='minimal' label='Completed' />
              </TabsContent>
            </Tabs>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Different Sizes</h3>
              <div className='space-y-6'>
                <FancyProgress value={80} size='sm' label='Small Size' />
                <FancyProgress value={80} size='md' label='Medium Size' />
                <FancyProgress value={80} size='lg' label='Large Size' />
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Real-time Progress</h3>
              <FancyProgress value={autoProgress} label='Real-time Progress' />
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <p className='text-sm text-muted-foreground'>
              Customize these progress indicators to match your design system
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
