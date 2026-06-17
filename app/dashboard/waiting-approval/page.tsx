// app/pending-approval/page.tsx

import { requireUser } from '@/app/actions/user';
import { UserStatus } from '@prisma/client';
import { redirect } from 'next/navigation';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default async function PendingApprovalPage() {
  const user = await requireUser();

  // ✅ Kung ACTIVE na, redirect sa dashboard
  if (user.status === UserStatus.ACTIVE) {
    redirect('/dashboard');
  }

  // ✅ Kung walang company pa, redirect sa invite
  if (!user.companyId) {
    redirect('/');
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-border bg-card w-full max-w-md rounded-3xl border p-8 text-center shadow-lg">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 text-2xl">
          ⏳
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold">Waiting for Approval</h1>
        <p className="text-muted-foreground mt-2">
          Your request to join has been submitted. Please wait for the Owner or
          Manager to approve your access.
        </p>

        {/* Info */}
        <div className="border-border bg-muted/50 text-muted-foreground mt-6 rounded-xl border px-4 py-3 text-sm">
          You will be notified once your account has been approved.
        </div>

        {/* Logout */}
        <LogoutLink className="text-muted-foreground hover:text-foreground mt-6 inline-block text-sm underline underline-offset-4 transition">
          Sign out
        </LogoutLink>
      </div>
    </div>
  );
}
