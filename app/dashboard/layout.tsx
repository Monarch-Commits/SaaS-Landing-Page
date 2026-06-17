// app/(protected)/dashboard/layout.tsx

import { syncUser } from '@/app/actions/user';
import { redirect } from 'next/navigation';
import { UserStatus } from '@prisma/client';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await syncUser();

  if (!user) {
    redirect('/api/auth/login');
  }

  // ✅ PENDING — hindi pa approved
  if (user.status === UserStatus.PENDING) {
    redirect('/pending-approval');
  }

  // ✅ SUSPENDED
  if (user.status === UserStatus.SUSPENDED) {
    redirect('/suspended');
  }

  // ✅ Walang company
  if (!user.companyId) {
    redirect('/create-company');
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <div className="mx-auto w-full max-w-7xl p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
