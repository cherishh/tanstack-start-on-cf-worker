import { createFileRoute, redirect } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { useRouter } from '@tanstack/react-router';
import { useSession } from '@/lib/auth-client';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session, 'session');
  return (
    <div>
      <div>logged in!</div>
      <h1>home</h1>
      {session && (
        <Button
          onClick={() =>
            signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.navigate({ to: '/' });
                },
              },
            })
          }
        >
          sign out
        </Button>
      )}
    </div>
  );
}
