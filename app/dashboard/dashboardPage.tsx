'use client';

import { memo } from 'react';
import Image from 'next/image';
import {
  Users,
  Bell,
  Search,
  Activity,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Plus,
  ArrowUpRight,
} from 'lucide-react';

import Chart from '@/components/Chart/ChartComponent';
import RecentTasks from '@/components/dashboard/recent-tasks';
import { SidebarTrigger } from '@/components/ui/sidebar';
import CreateTaskDialog from '@/components/dashboard/dialog-create-task';
import Link from 'next/link';
import ButtonLink from '@/components/dashboard/button/link';

const stats = [
  { label: 'Total Tasks', value: '2,847', change: '+12.5%', icon: Activity },
  { label: 'Completed', value: '1,923', change: '+8.2%', icon: CheckCircle2 },
  { label: 'Team Members', value: '48', change: '+3', icon: Users },
  { label: 'Productivity', value: '94%', change: '+5.4%', icon: TrendingUp },
];

const activities = [
  {
    id: 1,
    user: 'Sarah K.',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah',
    action: 'completed a workflow task',
    time: '2m ago',
  },
  {
    id: 2,
    user: 'Mike R.',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mike',
    action: 'started a new workflow',
    time: '15m ago',
  },
  {
    id: 3,
    user: 'Emma L.',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma',
    action: 'added a comment',
    time: '1h ago',
  },
];

type Props = {
  companyName: {
    id: string;
    name: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

function ManagerDashboardComponent({ companyName }: Props) {
  return (
    <div className="bg-background min-h-screen">
      {/* HEADER */}
      <header className="border-border/40 bg-background/70 sticky top-0 z-20 border-b backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 sm:px-4 md:px-6 md:py-4">
          {/* LEFT */}
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <span className="text-muted-foreground hidden text-sm font-medium sm:block">
              {/* {companyName?.name} */}
            </span>
          </div>

          {/* SEARCH */}
          <div className="flex flex-1 justify-center">
            <div className="border-border/40 bg-muted/40 focus-within:ring-primary/20 flex w-full max-w-md items-center gap-2 rounded-xl border px-3 py-2 transition focus-within:ring-2">
              <Search className="text-muted-foreground h-4 w-4" />

              <input
                placeholder="Search workflows, tasks..."
                className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <button
              className="border-border/40 bg-muted/40 hover:bg-muted/60 relative flex h-10 w-10 items-center justify-center rounded-xl border transition"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl space-y-6 px-3 py-4 sm:px-4 md:px-6 md:py-6">
        {/* STATS */}
        {/* 1. Ang parent container na ito ang humahawak sa mga Plus icons at border */}
        <div className="bg-card/50 relative backdrop-blur-sm">
          {/* Modernized Plus Icons: Pinaliit (-translate-bawas sa offset) at ginawang muted ang kulay para hindi masakit sa mata */}
          <Plus className="absolute -top-2 -left-2 h-4 w-4 text-white" />
          <Plus className="absolute -top-2 -right-2 h-4 w-4 text-white" />
          <Plus className="absolute -bottom-2 -left-2 h-4 w-4 text-white" />
          <Plus className="absolute -right-2 -bottom-2 h-4 w-4 text-white" />

          {/* Grid Container gamit ang responsive borders para sa pixel-perfect na kapal ng gitna */}
          <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-xl sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group hover:bg-muted/40 border-border relative border p-5 transition-all duration-300"
              >
                <div className="mb-4 flex items-center justify-between">
                  {/* Icon wrapper na may micro-interaction kapag ni-hover ang buong card */}
                  <div className="bg-primary/10 text-primary group-hover:bg-primary/15 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105">
                    <stat.icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-3" />
                  </div>

                  {/* Badge-style styling para sa percentage change */}
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500 ring-1 ring-green-500/20 ring-inset">
                    {stat.change}
                  </span>
                </div>

                <p className="text-muted-foreground/80 text-xs font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
                <h3 className="text-card-foreground mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl">
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* LEFT: CHART */}
          <div className="border-border bg-card/50 rounded-xl border p-4 sm:p-6 xl:col-span-2">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold sm:text-lg">
                  Workflow Performance
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Last 7 days activity
                </p>
              </div>

              <button className="text-primary flex items-center gap-1 text-xs sm:text-sm">
                View Report <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-hidden">
              <Chart />
            </div>

            <div className="mt-4">
              <RecentTasks />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">
            {/* AI CARD */}
            <div className="border-primary/20 from-primary/10 to-primary/5 rounded-xl border bg-linear-to-br p-4 sm:p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-xl">
                  <Sparkles className="text-primary h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-medium">AI Assistant</p>
                  <p className="text-muted-foreground text-xs">Always ready</p>
                </div>
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                I found 3 automation opportunities that could save ~12
                hours/week.
              </p>
            </div>

            {/* QUICK ACTIONS */}
            <div className="border-border bg-card/50 rounded-xl border p-4 sm:p-6">
              <h3 className="mb-4 text-sm font-semibold sm:text-base">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <CreateTaskDialog />

                {/* <Link
                  href="/dashboard/pending-members"
                  className="bg-muted/50 hover:bg-muted block w-full rounded-lg py-2.5 text-center text-sm"
                >
                  Invite Team Member
                </Link> */}

                <ButtonLink companyId={companyName?.id || ''} />

                <button className="bg-muted/50 hover:bg-muted w-full rounded-lg py-2.5 text-sm">
                  View Analytics
                </button>
              </div>
            </div>

            {/* ACTIVITY */}
            <div className="border-border bg-card/50 rounded-xl border p-4 sm:p-6">
              <h3 className="mb-4 text-sm font-semibold sm:text-base">
                Recent Activity
              </h3>

              <div className="space-y-4">
                {activities.map((a) => (
                  <div key={a.id} className="flex items-center gap-3">
                    <Image
                      src={a.avatar}
                      alt={a.user}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />

                    <div className="min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{a.user}</span>{' '}
                        <span className="text-muted-foreground">
                          {a.action}
                        </span>
                      </p>

                      <p className="text-muted-foreground text-xs">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const ManagerDashboard = memo(ManagerDashboardComponent);
