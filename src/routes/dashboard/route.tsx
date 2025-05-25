import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ context }) => {
    console.log('before load - dashboard layout', context);
    if (!context.user) {
      throw redirect({ to: '/' });
    }
    return { user: context.user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>;
}
