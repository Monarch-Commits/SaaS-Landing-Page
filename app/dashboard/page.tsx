import { getUserCompany } from '@/lib/auth/company';
import { ManagerDashboard } from './dashboardPage';

export default async function DashboardPage() {
  const companyName = await getUserCompany();
  return <ManagerDashboard companyName={companyName} />;
}
