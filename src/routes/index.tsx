import { createFileRoute } from '@tanstack/react-router';
import { useSession, signIn, signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const { data: session } = useSession();

  return (
    <div className='flex flex-col items-center justify-center h-screen mb-2'>
      <h1 className='text-2xl font-bold mb-4'> Home</h1>
      {!session && (
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
      )}
      <div className='mt-4'>
        <Button
          onClick={() => {
            throw new Error('test error');
          }}
        >
          test error
        </Button>
      </div>
    </div>
  );
}
