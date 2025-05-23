import { createFileRoute } from '@tanstack/react-router';
import { useSession, signIn, signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const { data: session } = useSession();

  return (
    <div className='p-2'>
      <h3>Welcome Home!!!</h3>
      {!session && (
        <Button
          onClick={() =>
            signIn.social({
              provider: 'github',
              callbackURL: '/welcome',
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
