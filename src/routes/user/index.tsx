import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getUserById } from '../../lib/db/queries/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FancyProgress from '@/components/fancy-progress';
import { useState, useEffect } from 'react';
import { BASE_URL } from '@/utils/base-url';

const userServerFn = createServerFn({ method: 'GET' })
  .validator((d: number) => d)
  .handler(({ data: id }) => {
    return getUserById(id);
  });

export const Route = createFileRoute('/user/')({
  loader: async () => {
    const user = await userServerFn({ data: 1 });
    const apiRes = await fetch(`${BASE_URL}/api/test`, {
      headers: {
        'cf-ipcountry': 'CN',
      },
    });
    if (!apiRes.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await apiRes.json();
    console.log('data', data);
    return { user, test: data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user, test } = Route.useLoaderData();

  return (
    <div>
      <h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </h2>
      <h2>
        <pre>{JSON.stringify(test, null, 2)}</pre>
      </h2>
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
