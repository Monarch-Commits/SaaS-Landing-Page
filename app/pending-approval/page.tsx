import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function PendingApprovalPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const initials =
    user?.given_name?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    'U';

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <Avatar className="mx-auto mb-6 h-20 w-20">
          <AvatarImage src={user?.picture ?? ''} alt={user?.email ?? 'User'} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <h1 className="text-3xl font-bold">Waiting for Approval</h1>

        {user?.email && (
          <p className="text-muted-foreground mt-2 text-sm">{user.email}</p>
        )}

        <p className="text-muted-foreground mt-4">
          Your profile has been submitted.
        </p>

        <p className="text-muted-foreground mt-2">
          Please wait for the owner or manager to approve your account.
        </p>
      </div>
    </div>
  );
}
