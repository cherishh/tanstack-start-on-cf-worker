import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/demo/$demoId')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex'>
      <aside className='w-64'>aside</aside>
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
}
