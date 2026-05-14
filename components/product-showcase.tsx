'use client';

import {
  Activity,
  BarChart3,
  Bell,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    active: true,
  },
  {
    icon: BarChart3,
    label: 'Analytics',
  },
  {
    icon: Users,
    label: 'Team',
  },
  {
    icon: MessageSquare,
    label: 'Messages',
  },
  {
    icon: Settings,
    label: 'Settings',
  },
];

const stats = [
  {
    label: 'Total Tasks',
    value: '2,847',
    change: '+12.5%',
    icon: Activity,
  },
  {
    label: 'Completed',
    value: '1,923',
    change: '+8.2%',
    icon: TrendingUp,
  },
  {
    label: 'Team Members',
    value: '48',
    change: '+3',
    icon: Users,
  },
];

const chartData = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 65 },
  { day: 'Wed', value: 45 },
  { day: 'Thu', value: 80 },
  { day: 'Fri', value: 55 },
  { day: 'Sat', value: 90 },
  { day: 'Sun', value: 75 },
];

const activities = [
  {
    user: 'Sarah K.',
    action: 'completed task',
    time: '2m ago',
  },
  {
    user: 'Mike R.',
    action: 'started workflow',
    time: '15m ago',
  },
  {
    user: 'Emma L.',
    action: 'added comment',
    time: '1h ago',
  },
];

export function ProductShowcase() {
  return (
    <section
      id="product"
      aria-labelledby="product-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.12),_transparent_45%)]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="border-primary/20 bg-primary/10 text-primary mb-5 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            Product
          </div>

          <h2
            id="product-heading"
            className="text-foreground text-4xl font-bold tracking-tight md:text-5xl"
          >
            Built for the way you work
          </h2>

          <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
            A powerful AI dashboard designed to streamline workflows,
            collaborate with teams, and automate repetitive tasks.
          </p>
        </div>

        {/* Dashboard */}
        <div className="relative">
          {/* Glow */}
          <div className="from-primary/20 to-primary/20 absolute inset-0 rounded-[2rem] bg-gradient-to-r via-violet-500/10 blur-3xl" />

          <div className="border-border/60 bg-background/70 relative overflow-hidden rounded-[2rem] border shadow-2xl backdrop-blur-xl">
            {/* Top Bar */}
            <div className="border-border/60 flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-5">
                {/* Mac dots */}
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="hidden sm:block">
                  <p className="text-foreground text-sm font-medium">
                    FlowAI Dashboard
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Manage your workflows efficiently
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="border-border/50 bg-muted/40 hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors"
                >
                  <Bell className="text-muted-foreground h-4 w-4" />
                </button>

                <button
                  type="button"
                  aria-label="Settings"
                  className="border-border/50 bg-muted/40 hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors"
                >
                  <Settings className="text-muted-foreground h-4 w-4" />
                </button>

                <div className="from-primary h-10 w-10 rounded-xl bg-gradient-to-br to-violet-500" />
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <aside className="border-border/60 bg-muted/20 hidden w-64 border-r p-4 lg:block">
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.label}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                          item.active
                            ? 'bg-primary text-primary-foreground shadow-primary/20 shadow-lg'
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Sidebar Card */}
                <div className="border-primary/20 from-primary/15 mt-8 rounded-2xl border bg-gradient-to-br to-violet-500/10 p-5">
                  <div className="bg-primary/20 mb-4 flex h-11 w-11 items-center justify-center rounded-xl">
                    <Sparkles className="text-primary h-5 w-5" />
                  </div>

                  <h3 className="text-foreground font-semibold">
                    AI Automation
                  </h3>

                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Save hours every week with intelligent workflow automation.
                  </p>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 p-6 lg:p-8">
                <div className="grid gap-6 xl:grid-cols-3">
                  {/* Left */}
                  <div className="space-y-6 xl:col-span-2">
                    {/* Stats */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                          <div
                            key={stat.label}
                            className="border-border/50 bg-muted/20 rounded-2xl border p-5 backdrop-blur-sm"
                          >
                            <div className="mb-4 flex items-center justify-between">
                              <p className="text-muted-foreground text-sm">
                                {stat.label}
                              </p>

                              <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-xl">
                                <Icon className="text-primary h-4 w-4" />
                              </div>
                            </div>

                            <div className="flex items-end gap-2">
                              <h3 className="text-3xl font-bold tracking-tight">
                                {stat.value}
                              </h3>

                              <span className="mb-1 text-xs font-medium text-green-500">
                                {stat.change}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Chart */}
                    <div className="border-border/50 bg-muted/20 rounded-2xl border p-6">
                      <div className="mb-8 flex items-center justify-between">
                        <div>
                          <h3 className="text-foreground font-semibold">
                            Workflow Performance
                          </h3>

                          <p className="text-muted-foreground text-sm">
                            Last 7 days activity
                          </p>
                        </div>

                        <div className="border-border/50 bg-background/60 text-muted-foreground rounded-full border px-3 py-1 text-xs">
                          +24.8%
                        </div>
                      </div>

                      <div className="flex h-64 items-end gap-3">
                        {chartData.map((item) => (
                          <div
                            key={item.day}
                            className="flex flex-1 flex-col items-center gap-3"
                          >
                            <div className="relative flex h-full w-full items-end">
                              <div
                                className="from-primary/50 to-primary hover:from-primary w-full rounded-t-2xl bg-gradient-to-t transition-all duration-300 hover:to-violet-500"
                                style={{
                                  height: `${item.value}%`,
                                }}
                              />
                            </div>

                            <span className="text-muted-foreground text-xs">
                              {item.day}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Panel */}
                  <div className="space-y-6">
                    {/* AI Card */}
                    <div className="border-primary/20 from-primary/15 overflow-hidden rounded-2xl border bg-gradient-to-br to-violet-500/10 p-5">
                      <div className="mb-5 flex items-center gap-4">
                        <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-2xl">
                          <Sparkles className="text-primary h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="text-foreground font-semibold">
                            AI Assistant
                          </h3>

                          <p className="text-muted-foreground text-sm">
                            Smart workflow insights
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="border-border/40 bg-background/60 text-muted-foreground rounded-2xl border p-4 text-sm leading-relaxed">
                          I analyzed your workflows and found 3 automation
                          opportunities that can save your team 12+ hours
                          weekly.
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="border-border/50 bg-background/40 h-11 flex-1 rounded-xl border" />

                          <button
                            type="button"
                            className="bg-primary text-primary-foreground flex h-11 w-11 items-center justify-center rounded-xl transition-transform hover:scale-105"
                          >
                            <Sparkles className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="border-border/50 bg-muted/20 rounded-2xl border p-5">
                      <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-foreground font-semibold">
                          Recent Activity
                        </h3>

                        <span className="text-muted-foreground text-xs">
                          Live updates
                        </span>
                      </div>

                      <div className="space-y-4">
                        {activities.map((activity) => (
                          <div
                            key={`${activity.user}-${activity.time}`}
                            className="flex items-start gap-3"
                          >
                            <div className="from-primary/30 h-10 w-10 rounded-full bg-gradient-to-br to-violet-500/30" />

                            <div className="min-w-0 flex-1">
                              <p className="text-foreground text-sm leading-relaxed">
                                <span className="font-medium">
                                  {activity.user}
                                </span>{' '}
                                <span className="text-muted-foreground">
                                  {activity.action}
                                </span>
                              </p>

                              <p className="text-muted-foreground mt-1 text-xs">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
