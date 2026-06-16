import { getUserCompany } from '../actions/owner/company';
import { ManagerDashboard } from './dashboardPage';

export default async function DashboardPage() {
  const companyName = await getUserCompany();
  return <ManagerDashboard companyName={companyName} />;
}
