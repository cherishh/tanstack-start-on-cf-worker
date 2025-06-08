import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useSession, signIn, signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    // console.log('loader - home', context);
    return { user: context.user };
  },
  component: Home,
});

function Home() {
  const { queryClient } = Route.useRouteContext();
  const { user } = Route.useLoaderData();
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center h-screen mb-2'>
      <h1 className='text-2xl font-bold mb-4'> Home</h1>
      {!user ? (
        <Button
          onClick={() =>
            signIn.social({
              provider: 'github',
              callbackURL: '/dashboard',
            })
          }
        >
          sign in with github
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await signOut();
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            await router.invalidate();
          }}
          type='button'
          className='w-fit'
          variant='destructive'
          size='lg'
        >
          Sign out
        </Button>
      )}
      <div className='mt-4'>
        <Button
          onClick={() => {
            throw new Error('test error');
          }}
        >
          trigger error
        </Button>
        <div>👆This will trigger an error & will be shown on Sentry.</div>
      </div>
    </div>
  );
}
