import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary';
import { NotFound } from '@/components/NotFound';
import appCss from '@/styles/app.css?url';
import { seo } from '@/utils/seo';
import { ThemeProvider, useTheme } from '@/components/theme-provider';
import { getThemeServerFn } from '@/lib/theme';
import { ModeToggle } from '@/components/mode-toggle';
import { wrapCreateRootRouteWithSentry } from '@sentry/tanstackstart-react';

export const Route = wrapCreateRootRouteWithSentry(
  createRootRoute({
    loader: () => getThemeServerFn(),
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
    <ThemeProvider theme={data}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ThemeProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <html className={`h-full ${theme}`}>
      <head>
        <HeadContent />
      </head>
      <body className='h-full'>
        <div className='p-2 flex gap-2 text-lg'>
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
            to='/dashboad'
            activeProps={{
              className: 'font-bold',
            }}
          >
            dashboad
          </Link>
          <ModeToggle />
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position='bottom-right' />
        <Scripts />
      </body>
    </html>
  );
}
