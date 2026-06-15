'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  LogOut,
  PersonStandingIcon,
} from 'lucide-react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Users, label: 'Team', href: '/dashboard/team' },
  {
    icon: PersonStandingIcon,
    label: 'Pending Members',
    href: '/dashboard/pending-members',
  },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    lastLoginAt?: Date | string | null; // 👈 ADD THIS
  } | null;
};

export function AppSidebar({ user }: Props) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="group">
      {/* HEADER / LOGO */}
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/FlowAI.svg"
            alt="FlowAI Logo"
            width={32}
            height={32}
            className="h-9 w-9 shrink-0 rounded-lg"
            priority
          />

          <span className="text-lg font-semibold transition-all group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:opacity-0">
            FlowAI
          </span>
        </Link>
      </SidebarHeader>

      {/* CONTENT / MENU */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild tooltip={item.label}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />

                        <span className="transition-all group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:opacity-0">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER / USER */}
      <SidebarFooter className="space-y-3 p-3">
        <p className="text-muted-foreground text-[10px] group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:opacity-0">
          Last login:{' '}
          {user?.lastLoginAt
            ? new Date(user.lastLoginAt).toLocaleDateString()
            : 'Never'}
        </p>

        <div className="flex items-center gap-3">
          <Image
            src={
              user?.image ||
              'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma'
            }
            alt="user"
            width={36}
            height={36}
            className="shrink-0 rounded-full"
          />

          <div className="min-w-0 transition-all group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:opacity-0">
            <p className="truncate text-sm font-medium">{user?.role || ''}</p>
            <p className="truncate text-sm font-medium">
              {user?.name || 'User'}
            </p>

            <p className="text-muted-foreground truncate text-xs">
              {user?.email || 'email@example.com'}
            </p>
          </div>
        </div>

        {/* 🔥 LOGOUT BUTTON */}
        <LogoutLink className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition hover:bg-red-500/10">
          <LogOut className="h-4 w-4" />
          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
        </LogoutLink>
      </SidebarFooter>
    </Sidebar>
  );
}
