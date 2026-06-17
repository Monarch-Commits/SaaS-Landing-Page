'use client';

import { useState } from 'react';
import { createInvite } from '@/app/actions/owner/create-invite';
import { useFormStatus } from 'react-dom';

const ERROR_MESSAGES: Record<string, string> = {
  'Email is required': 'Please enter an email address.',
  USER_ALREADY_A_MEMBER: 'This user is already a member of your company.',
  INVITE_ALREADY_SENT: 'An invite has already been sent to this email.',
  FORBIDDEN: 'You do not have permission to invite members.',
  NO_COMPANY_ASSIGNED: 'You are not assigned to a company.',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Generating...' : 'Generate Invite Link'}
    </button>
  );
}

export default function InviteForm() {
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleAction(formData: FormData) {
    setError(null);
    setLink(null);
    setCopied(false);

    const email = formData.get('email') as string;

    try {
      const inviteLink = await createInvite(email);
      setLink(inviteLink);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          ERROR_MESSAGES[err.message] ?? 'Something went wrong. Try again.',
        );
      }
    }
  }

  async function handleCopy() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      {/* Form */}
      <form action={handleAction} className="space-y-3">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="member@example.com"
            className="bg-background focus:ring-primary/20 w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="rounded-lg border border-red-800 bg-red-950 px-3 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}

        <SubmitButton />
      </form>

      {/* ✅ Generated link */}
      {link && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Invite Link</p>
          <div className="bg-muted/50 flex items-center gap-2 rounded-lg border px-3 py-2.5">
            <p className="text-muted-foreground flex-1 truncate text-sm">
              {link}
            </p>
            <button
              onClick={handleCopy}
              className="text-primary hover:text-primary/80 shrink-0 text-sm font-medium transition"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
