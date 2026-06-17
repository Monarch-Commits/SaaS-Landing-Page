'use client';

import { useActionState, useEffect } from 'react';
import { acceptInvite } from '../actions/members/update-profile';

const ERROR_MESSAGES: Record<string, string> = {
  MISSING_INVITE_TOKEN: 'Missing invite token.',
  INVALID_INVITE_TOKEN: 'Invalid invite link.',
  INVITE_ALREADY_USED: 'This invite has already been used.',
  INVITE_EXPIRED: 'This invite link has expired.',
  INVITE_EMAIL_MISMATCH: 'This invite was not sent to your email.',
  USER_ALREADY_HAS_COMPANY: 'You are already part of a company.',
};

async function acceptInviteAction(
  _prev: string | null,
  formData: FormData,
): Promise<string | null> {
  try {
    await acceptInvite(formData);
    return null;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return ERROR_MESSAGES[err.message] ?? 'Something went wrong. Try again.';
    }
    return 'Something went wrong. Try again.';
  }
}

export default function OnboardingClient({
  token,
  companyName,
}: {
  token: string;
  companyName: string;
}) {
  const [error, formAction, isPending] = useActionState(
    acceptInviteAction,
    null,
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="bg-card w-full max-w-md rounded-3xl border p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Welcome to {companyName}</h1>
          <p className="text-muted-foreground mt-2">
            Complete your profile to request access.
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="token" value={token} />

          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoFocus
              placeholder="John Doe"
              className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="image" className="block text-sm font-medium">
              Avatar URL{' '}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://..."
              className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-black/20 focus:outline-none"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-xl border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? 'Submitting...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
