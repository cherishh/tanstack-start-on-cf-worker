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
            })
          }
        >
          sign in with github
        </Button>
      )}
    </div>
  );
}
