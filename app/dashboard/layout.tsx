import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { syncUser } from '../actions/user';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// layout.tsx
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await syncUser(); // ✅ 1 DB call — may company na included

  if (!user) return null;

  // ✅ checkFirstLogin logic dito na lang — no extra DB call
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
