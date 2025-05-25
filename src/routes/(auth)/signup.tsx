import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { GalleryVerticalEnd, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

export const Route = createFileRoute('/(auth)/signup')({
  component: SignupForm,
});

function SignupForm() {
  return <div className='flex flex-col gap-6'>todo</div>;
}
