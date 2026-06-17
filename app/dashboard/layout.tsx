import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { getCurrentUser, requireUser, syncUser } from '@/lib/auth/user';
import { checkFirstLogin } from '@/lib/auth/company';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await syncUser();
  await checkFirstLogin();
  const user = await requireUser();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <div className="mx-auto w-full max-w-7xl p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
