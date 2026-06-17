'use client';

import { useActionState } from 'react';
import { createCompany } from '../actions/owner/company';

const ERROR_MESSAGES: Record<string, string> = {
  COMPANY_NAME_TAKEN: 'Company name is already taken.',
  'Company name is required': 'Please enter a company name.',
};

async function createCompanyAction(
  _prev: string | null,
  formData: FormData,
): Promise<string | null> {
  try {
    await createCompany(formData);
    return null;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return ERROR_MESSAGES[err.message] ?? 'Something went wrong. Try again.';
    }
    return 'Something went wrong. Try again.';
  }
}

export default function CreateCompanyPage() {
  const [error, formAction, isPending] = useActionState(
    createCompanyAction,
    null,
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white">
              Create your company
            </h1>
            <p className="mt-2 text-sm text-neutral-400">
              Start your workspace in seconds
            </p>
          </div>

          {/* Form */}
          <form action={formAction} className="mt-6 space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-neutral-300"
              >
                Company name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Flow AI Inc."
                autoComplete="off"
                autoFocus
                required
                className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-white/20 focus:outline-none"
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
              className="w-full rounded-xl bg-white py-3 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? 'Creating...' : 'Create Company'}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-neutral-500">
            You will become the owner automatically
          </p>
        </div>
      </div>
    </div>
  );
}
