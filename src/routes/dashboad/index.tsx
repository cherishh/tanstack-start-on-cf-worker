import { createFileRoute, redirect } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { useRouter } from '@tanstack/react-router';
import { useSession } from '@/lib/auth-client';

export const Route = createFileRoute('/dashboad/')({
  beforeLoad: async ({ context }) => {
    console.log('before load runed.', context);
    if (!context.user) {
      throw redirect({ to: '/' });
    }
    return { user: context.user };
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
