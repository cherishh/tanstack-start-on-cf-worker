import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { useSession, signOut, getSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/welcome')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session.data) {
      throw redirect({ to: '/' });
    }
    return { session };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session, 'session');
  return (
    <div>
      <div>logged in!</div>
      <h1>welcome</h1>
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
