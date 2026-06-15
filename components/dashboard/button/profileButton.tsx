'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full rounded-xl bg-black py-2 text-white"
    >
      {pending ? 'Saving...' : 'Save Profile'}
    </button>
  );
}
