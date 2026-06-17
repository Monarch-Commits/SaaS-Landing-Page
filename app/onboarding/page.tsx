'use client';

import { useActionState } from 'react';
import { acceptInvite } from '../actions/members/update-profile';

const ERROR_MESSAGES: Record<string, string> = {
  MISSING_INVITE_TOKEN: 'Missing invite token.',
  INVALID_INVITE_TOKEN: 'Invalid invite link.',
  INVITE_ALREADY_USED: 'This invite has already been used.',
  INVITE_EXPIRED: 'This invite link has expired.',
  INVITE_EMAIL_MISMATCH: 'This invite was not sent to your email.',
  USER_ALREADY_HAS_COMPANY: 'You are already part of a company.',
  SERVER_ERROR: 'Something went wrong. Please try again.',
};

export default function OnboardingClient({
  token,
  companyName,
}: {
  token: string;
  companyName: string;
}) {
  const [error, formAction, isPending] = useActionState(acceptInvite, null);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="bg-card w-full max-w-md rounded-3xl border p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Welcome to {companyName}</h1>
          <p className="text-muted-foreground mt-2">
            Complete your profile to request access.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="token" value={token} />

          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              name="name"
              required
              className="w-full rounded-xl border p-3"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Avatar URL</label>
            <input
              name="image"
              type="url"
              className="w-full rounded-xl border p-3"
              placeholder="https://..."
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-400">
              {ERROR_MESSAGES[error] ?? 'Something went wrong.'}
            </p>
          )}

          <button
            disabled={isPending}
            className="w-full rounded-xl bg-black py-3 text-white disabled:opacity-50"
          >
            {isPending ? 'Submitting...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
