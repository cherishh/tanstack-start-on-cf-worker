import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/demo/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>Hello "/demo/"!</div>
      <div className='flex gap-8'>
        <Link to='/demo/$demoId' params={{ demoId: '1' }}>
          Demo 1
        </Link>
        <Link to='/demo/$demoId' params={{ demoId: '2' }}>
          Demo 2
        </Link>
      </div>
    </div>
  );
}
