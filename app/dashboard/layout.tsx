import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { checkFirstLogin } from '../actions/owner/company';
import { checkAccessToDashboard } from '../actions/members/get-pending-members';
import { syncUser } from '../actions/user';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await syncUser();
  await checkFirstLogin();
  const user = await checkAccessToDashboard();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <div className="mx-auto w-full max-w-7xl p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
