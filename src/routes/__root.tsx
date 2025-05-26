import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext, ScriptOnce } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary';
import { NotFound } from '@/components/NotFound';
import appCss from '@/styles/app.css?url';
import { seo } from '@/utils/seo';
import ThemeToggle from '@/components/mode-toggle';
import { wrapCreateRootRouteWithSentry } from '@sentry/tanstackstart-react';
import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';
import { auth } from '@/lib/auth';
import { Toaster } from '@/components/ui/sonner';

const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const { headers } = getWebRequest()!;
  const session = await auth.api.getSession({ headers });

  return session?.user || null;
});

export const Route = wrapCreateRootRouteWithSentry(
  createRootRouteWithContext<{
    queryClient: QueryClient;
    user: Awaited<ReturnType<typeof getUser>>;
  }>()({
    beforeLoad: async ({ context }) => {
      console.log('before load root', context.user);
      const user = await context.queryClient.fetchQuery({
        queryKey: ['user'],
        queryFn: ({ signal }) => getUser({ signal }),
      }); // we're using react-query for caching, see router.tsx
      return { user };
    },
    head: () => ({
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        ...seo({
          title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
          description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
        }),
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
        { rel: 'icon', href: '/favicon.ico' },
      ],
    }),
    errorComponent: props => {
      return (
        <RootDocument>
          <DefaultCatchBoundary {...props} />
        </RootDocument>
      );
    },
    notFoundComponent: () => <NotFound />,
    component: RootComponent,
  })
);

function RootComponent() {
  const data = Route.useLoaderData();
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className='h-full'>
        <ScriptOnce>
          {`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
        </ScriptOnce>

        <div className='p-2 flex gap-2 text-lg items-center'>
          <Link
            to='/'
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to='/user'
            activeProps={{
              className: 'font-bold',
            }}
          >
            User
          </Link>{' '}
          <Link
            to='/posts'
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to='/route-a'
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to='/deferred'
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to='/this-route-does-not-exist'
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
          <Link
            to='/llm'
            activeProps={{
              className: 'font-bold',
            }}
          >
            llm
          </Link>
          <Link
            to='/dashboard'
            activeProps={{
              className: 'font-bold',
            }}
          >
            dashboard
          </Link>
          <div className='flex-1' />
          <ThemeToggle />
        </div>
        <hr />
        {children}
        <Toaster />
        <TanStackRouterDevtools position='bottom-right' />
        <ReactQueryDevtools buttonPosition='bottom-left' />
        <Scripts />
      </body>
    </html>
  );
}
