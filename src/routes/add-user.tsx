import { createFileRoute, redirect } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const Route = createFileRoute('/add-user')({
  beforeLoad: async ({ context }) => {
    console.log('before load - dashboard layout', context);
    if (!context.user || (context.user.role !== 'admin' && context.user.role !== 'superadmin')) {
      throw redirect({ to: '/' });
    }
    return { user: context.user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    setIsLoading(true);
    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/createAdmin', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        toast.success('Admin added successfully');
      } else {
        toast.error('Failed to add admin');
      }
    } catch (err) {
      setErrorMessage('Failed to add admin');
    } finally {
      setErrorMessage('');
      setIsLoading(false);
    }
  };
  return (
    <div>
      <AdminForm handleSubmit={handleSubmit} isLoading={isLoading} errorMessage={errorMessage} />
    </div>
  );
}

const AdminForm = ({
  handleSubmit,
  isLoading,
  errorMessage,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  errorMessage: string;
}) => {
  return (
    <div className='w-1/6 mx-auto flex flex-col gap-2 m-8'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 mb-4'>
          <Label htmlFor='name'>Name</Label>
          <Input defaultValue='alskjf' type='text' name='name' placeholder='name' readOnly={isLoading} required />
        </div>
        <div className='flex flex-col gap-2 mb-4'>
          <Label htmlFor='email'>Email</Label>
          <Input
            defaultValue='adglsfsjf@gmail.com'
            id='email'
            name='email'
            type='email'
            placeholder='hello@example.com'
            readOnly={isLoading}
            required
          />
        </div>
        <div className='flex flex-col gap-2 mb-4'>
          <Label htmlFor='password'>Password</Label>
          <Input
            defaultValue='12345678'
            type='password'
            name='password'
            placeholder='password'
            readOnly={isLoading}
            required
          />
        </div>
        <div className='flex justify-center mt-4'>
          <Button type='submit'>{isLoading ? 'Adding admin...' : 'Add admin'}</Button>
        </div>
        {errorMessage && <span className='text-destructive text-center text-sm'>{errorMessage}</span>}
      </form>
    </div>
  );
};
