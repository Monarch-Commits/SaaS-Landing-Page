import { createInvite } from '@/app/actions/members/create-invite';

export default function ButtonLink({ companyId }: { companyId: string }) {
  const handleGenerate = async () => {
    const link = await createInvite(companyId);

    await navigator.clipboard.writeText(link);

    alert('Invite link copied!');
  };
  return (
    <button
      onClick={handleGenerate}
      className="bg-muted/50 hover:bg-muted block w-full rounded-lg py-2.5 text-center text-sm"
    >
      Generate Invite Link
    </button>
  );
}
