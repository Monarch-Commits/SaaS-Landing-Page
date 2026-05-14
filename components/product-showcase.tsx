'use client';

import React from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Bell,
  Settings,
  Users,
  BarChart3,
  TrendingUp,
  Activity,
  Sparkles,
} from 'lucide-react';
import Chart from './Chart/Chart';
import Image from 'next/image';

const sidebarItems = [
  { icon: BarChart3, label: 'Analytics' },
  { icon: Users, label: 'Team' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: Settings, label: 'Settings' },
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
    label: 'Team',
    value: '48',
    change: '+3',
    icon: Users,
  },
];

const activities = [
  {
    id: 1,
    user: 'Sarah K.',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=DanielKim',
    action: 'completed a task',
    time: '2m ago',
  },
  {
    id: 2,
    user: 'Mike R.',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=OliviaMartinez',
    action: 'started a workflow',
    time: '15m ago',
  },
  {
    id: 3,
    user: 'Emma L.',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=JamesWilson',
    action: 'added a comment',
    time: '1h ago',
  },
];

function ProductShowcaseComponent() {
  return (
    <section id="product" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* HEADER */}
        <div className="mb-16 text-center">
          <span className="bg-accent/10 text-accent mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
            Product
          </span>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Built for the way you work
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            A powerful dashboard designed to give you complete control over your
            workflows.
          </p>
        </div>

        {/* DASHBOARD */}
        <div className="relative">
          <div className="from-primary/20 via-accent/20 to-primary/20 absolute -inset-4 rounded-3xl" />

          <div className="border-border bg-background/60 relative overflow-hidden rounded-2xl border backdrop-blur-xl">
            {/* TOP BAR */}
            <div className="border-border flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  FlowAI Dashboard
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Bell className="text-muted-foreground h-4 w-4" />
                <Settings className="text-muted-foreground h-4 w-4" />
                <div className="bg-primary/30 h-7 w-7 rounded-full" />
              </div>
            </div>

            {/* LAYOUT */}
            <div className="flex flex-col lg:flex-row">
              {/* SIDEBAR */}
              <div className="border-border bg-muted/20 hidden w-56 flex-col border-r p-4 lg:flex">
                <div className="bg-primary/10 text-primary mb-1 flex items-center gap-3 rounded-lg px-3 py-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </div>

                {sidebarItems.map((item) => (
                  <div
                    key={item.label}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-3 px-3 py-2 text-sm transition"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* MAIN */}
              <div className="flex-1 p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* LEFT */}
                  <div className="w-full space-y-6 lg:col-span-2">
                    {/* STATS */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="border-border bg-muted/30 rounded-xl border p-4"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-muted-foreground text-xs">
                              {stat.label}
                            </span>
                            <stat.icon className="text-muted-foreground h-4 w-4" />
                          </div>

                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold sm:text-2xl">
                              {stat.value}
                            </span>
                            <span className="text-xs text-green-500">
                              {stat.change}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Chart />
                  </div>

                  {/* RIGHT */}
                  <div className="w-full space-y-6">
                    {/* AI PANEL */}
                    <div className="border-border from-primary/10 to-accent/10 rounded-xl border bg-gradient-to-br p-4">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-xl">
                          <Image
                            src="/AIAssistant.svg"
                            alt="AI Assistant Avatar"
                            width={32}
                            height={32}
                            className="h-5 w-5 rounded-lg"
                            priority
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">AI Assistant</p>
                          <p className="text-muted-foreground text-xs">
                            Always ready
                          </p>
                        </div>
                      </div>

                      <div className="bg-background/50 text-muted-foreground rounded-lg p-3 text-sm">
                        I've analyzed your workflows. Here are 3 suggestions...
                      </div>
                    </div>

                    {/* ACTIVITY */}
                    <div className="border-border bg-muted/30 rounded-xl border p-4">
                      <h3 className="mb-4 text-sm font-medium">
                        Recent Activity
                      </h3>

                      <div className="space-y-3">
                        {activities.map((a) => (
                          <div
                            key={a.id || a.user}
                            className="flex items-center gap-3"
                          >
                            {/* Avatar wrapper */}
                            <div className="bg-primary/20 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                              <Image
                                src={a.avatar}
                                alt={a.user}
                                width={32}
                                height={32}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            {/* Text content */}
                            <div className="leading-tight">
                              <p className="text-sm">
                                <span className="font-medium">{a.user}</span>{' '}
                                <span className="text-muted-foreground">
                                  {a.action}
                                </span>
                              </p>

                              <p className="text-muted-foreground text-xs">
                                {a.time}
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

export const ProductShowcase = React.memo(ProductShowcaseComponent);
