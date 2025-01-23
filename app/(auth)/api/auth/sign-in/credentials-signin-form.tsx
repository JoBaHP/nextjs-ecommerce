'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signInWithCredentials } from '@/lib/actions/user.actions';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react'; // Import the signIn method
import Image from 'next/image';

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Google Sign-In Button */}
      <button
        onClick={() => signIn('google', { callbackUrl })}
        type="button"
        className="w-full flex items-center justify-center space-x-2 border rounded-md py-2 px-4 bg-white hover:bg-gray-100"
      >
        <Image
          src="/images/google-logo.png" // Add a Google logo image in the public folder
          width={20}
          height={20}
          alt="Google logo"
        />
        <span>Sign in with Google</span>
      </button>

      {/* Separator */}
      <div className="relative my-4">
        <hr className="border-t" />
        <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2">
          or
        </span>
      </div>

      {/* Credentials Sign-In Form */}
      <form action={action}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue={signInDefaultValues.email}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="password"
              defaultValue={signInDefaultValues.password}
            />
          </div>
          <div>
            <SignInButton />
          </div>

          {data && !data.success && (
            <div className="text-center text-destructive">{data.message}</div>
          )}

          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/api/auth/sign-up" target="_self" className="link">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CredentialsSignInForm;
