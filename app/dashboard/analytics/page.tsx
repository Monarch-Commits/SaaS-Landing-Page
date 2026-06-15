import BarChartCard from '@/components/Chart/BarChartCard';
import ChartComponent from '@/components/Chart/ChartComponent';
import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  DollarSign,
} from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="bg-background min-h-screen p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Overview of your company performance
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Users" value="1,248" trend="+12%" />

        <StatCard
          icon={Activity}
          label="Active Users"
          value="842"
          trend="+5%"
        />

        <StatCard
          icon={BarChart3}
          label="Tasks Completed"
          value="3,421"
          trend="+18%"
        />

        <StatCard
          icon={DollarSign}
          label="Revenue"
          value="$12,430"
          trend="+9%"
        />
      </div>

      {/* CHART PLACEHOLDER */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="bg-card rounded-2xl border p-6">
          <h2 className="mb-4 font-semibold">Performance Overview</h2>

          <BarChartCard />
        </div>

        <div className="bg-card rounded-2xl border p-6">
          <h2 className="mb-4 font-semibold">User Growth</h2>

          <ChartComponent />
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-card mt-6 rounded-2xl border p-6">
        <h2 className="mb-4 font-semibold">Recent Activity</h2>

        <div className="space-y-3">
          <ActivityItem text="Juan completed a task" time="2m ago" />
          <ActivityItem text="Maria joined the company" time="1h ago" />
          <ActivityItem text="New invite sent" time="3h ago" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: any;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-card rounded-2xl border p-5 transition hover:shadow-sm">
      <div className="flex items-center justify-between">
        <Icon className="text-muted-foreground h-5 w-5" />

        <span className="text-xs font-medium text-green-500">{trend}</span>
      </div>

      <p className="text-muted-foreground mt-3 text-sm">{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex items-center justify-between border-b py-2 last:border-none">
      <p className="text-sm">{text}</p>
      <span className="text-muted-foreground text-xs">{time}</span>
    </div>
  );
}
