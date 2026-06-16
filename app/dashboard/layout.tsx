import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { getCurrentUser, syncUser } from '../actions/user';
import { checkFirstLogin } from '../actions/owner/company';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Sync Kinde user → DB (name, image, lastLoginAt)
  await syncUser();

  // 2. If user has no company yet, redirect to /create-company.
  //    Make sure /create-company lives OUTSIDE this layout's route group
  //    so it doesn't trigger this check and cause an infinite redirect loop.
  await checkFirstLogin();

  // 3. Fetch full user for sidebar
  const user = await getCurrentUser();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <div className="mx-auto w-full max-w-7xl p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
