import { createFileRoute, redirect } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { createServerFn } from '@tanstack/react-start';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { z } from 'zod';
import { Label } from '@/components/ui/label';

// 前端直接调 serverFn 显示 401 UNAUTHORIZED，尽管已经直接在 db把当前用户改成了 admin。
// 改为 api routes 调用，他妈的在服务端调用仍然出现 401 UNAUTHORIZED
// no idea why
// 暂时使用直接检测用户名
const createAdminUser = createServerFn({ method: 'POST' })
  .validator(data => {
    const res = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
      .safeParse(data);
    return res;
  })
  .handler(async ({ data }) => {
    if (data.success) {
      const { name, email, password } = data.data;
      const updateUser = await authClient.admin.setRole({
        userId: 'PTkx92DjqEYzbgeltNxS7fAHfXEIczug',
        role: 'admin',
      });
      console.log(updateUser, 'updateUser');
      return updateUser;
      const newAdmin = await authClient.admin.createUser({
        name,
        email,
        password,
        role: 'user',
      });
      console.log(newAdmin, 'newAdmin');
      return newAdmin;
    }
  });

export const Route = createFileRoute('/llm')({
  beforeLoad: async ({ context }) => {
    console.log('before load - dashboard layout', context);
    // if (!context.user) {
    if (!context.user || context.user.name !== 'letsbuild25') {
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
      const json = await res.json();
      console.log(json, 'add admin res');
    } catch (err) {
      setErrorMessage('Failed to add admin');
    } finally {
      setErrorMessage('');
      setIsLoading(false);
    }
  };
  return (
    <div>
      {/* <AdminForm handleSubmit={handleSubmit} isLoading={isLoading} errorMessage={errorMessage} /> */}
      <h2>ai chat</h2>
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
          <Input type='text' name='name' placeholder='name' readOnly={isLoading} required />
        </div>
        <div className='flex flex-col gap-2 mb-4'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' name='email' type='email' placeholder='hello@example.com' readOnly={isLoading} required />
        </div>
        <div className='flex flex-col gap-2 mb-4'>
          <Label htmlFor='password'>Password</Label>
          <Input type='password' name='password' placeholder='password' readOnly={isLoading} required />
        </div>
        <div className='flex justify-center mt-4'>
          <Button type='submit'>{isLoading ? 'Adding admin...' : 'Add admin'}</Button>
        </div>
        {errorMessage && <span className='text-destructive text-center text-sm'>{errorMessage}</span>}
      </form>
    </div>
  );
};
