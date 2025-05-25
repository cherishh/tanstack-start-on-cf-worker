import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/llm')({
  beforeLoad: async ({}) => {},
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/llm"!</div>;
}
