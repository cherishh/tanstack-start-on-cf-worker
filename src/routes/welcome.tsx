import { createFileRoute } from '@tanstack/react-router';
import { useSession } from '@/lib/auth-client';

export const Route = createFileRoute('/welcome')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = useSession();
  console.log(session, 'session');
  return (
    <div>
      <div>logged in!</div>
      <h1>welcome</h1>
    </div>
  );
}
