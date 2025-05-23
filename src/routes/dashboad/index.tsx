import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboad/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboad/"!</div>;
}
