import { createFileRoute } from '@tanstack/react-router';
import { signIn } from '@/lib/auth-client';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
