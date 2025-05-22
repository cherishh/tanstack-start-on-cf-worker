import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/demo/$demoId/deep/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/demo/$demoId/deep/"!</div>;
}
