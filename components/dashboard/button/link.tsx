'use client';

import { createInvite } from '@/app/actions/owner/create-invite';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-muted/50 hover:bg-muted block w-full rounded-lg py-2.5 text-center text-sm"
    >
      {pending ? 'Generating...' : 'Generate Invite Link'}
    </button>
  );
}

export default function ButtonLink({ companyId }: { companyId: string }) {
  return (
    <form
      action={async () => {
        const link = await createInvite(companyId);
        await navigator.clipboard.writeText(link);
        alert('Invite link copied!');
      }}
    >
      <SubmitButton />
    </form>
  );
}
