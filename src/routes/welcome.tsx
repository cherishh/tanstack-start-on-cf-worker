import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/welcome')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>logged in!</div>
      <h1>welcome</h1>
    </div>
  );
}
