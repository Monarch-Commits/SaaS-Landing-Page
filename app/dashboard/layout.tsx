import { redirect } from 'next/navigation';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { getCurrentUser, syncUser, updateLastLogin } from '../actions/user';
export const dynamic = 'force-dynamic';
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await syncUser();

  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  await updateLastLogin(user.email);
  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <SidebarInset>
        <div className="mx-auto w-full max-w-7xl p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
