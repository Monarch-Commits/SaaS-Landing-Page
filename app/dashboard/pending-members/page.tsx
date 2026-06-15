import { getPendingMembers } from '@/app/actions/members/get-pending-members';
import PendingClient from './pending-client';

export default async function Page() {
  const members = await getPendingMembers();

  return <PendingClient initialMembers={members} />;
}
