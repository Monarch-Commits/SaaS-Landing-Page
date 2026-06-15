'use client';

import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

type Status = 'done' | 'in_progress' | 'blocked';

type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  assignee: {
    name: string;
    image: string;
  };
  time: string;
};

const tasks: Task[] = [
  {
    id: '1',
    title: 'Fix authentication flow',
    description: 'Resolve session sync issue on login',
    status: 'in_progress',
    assignee: {
      name: 'Sarah K.',
      image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah',
    },
    time: '2h ago',
  },
  {
    id: '2',
    title: 'Redesign onboarding UX',
    description: 'Improve first-time user experience',
    status: 'done',
    assignee: {
      name: 'Mike R.',
      image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mike',
    },
    time: '5h ago',
  },
  {
    id: '3',
    title: 'Optimize dashboard performance',
    description: 'Reduce load time by 40%',
    status: 'blocked',
    assignee: {
      name: 'Emma L.',
      image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma',
    },
    time: '1d ago',
  },
];

function StatusPill({ status }: { status: Status }) {
  const styles = {
    done: 'bg-green-500/10 text-green-500 border-green-500/20',
    in_progress: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    blocked: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  const labels = {
    done: 'Completed',
    in_progress: 'In Progress',
    blocked: 'Blocked',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium sm:text-[11px] ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default function RecentTasks() {
  return (
    <div className="border-border/40 bg-card/60 mt-6 rounded-xl border p-3 backdrop-blur-xl sm:p-5 md:p-6">
      {/* HEADER */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold sm:text-lg">Recent Tasks</h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Real-time team activity overview
          </p>
        </div>

        <button className="text-muted-foreground hover:text-foreground text-xs transition sm:text-sm">
          View all
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2 sm:space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group border-border/30 hover:bg-muted/40 flex items-start justify-between gap-3 rounded-lg border p-3 transition sm:items-center sm:rounded-xl sm:p-4"
          >
            {/* LEFT */}
            <div className="flex min-w-0 items-start gap-3">
              <Image
                src={task.assignee.image}
                alt={task.assignee.name}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
              />

              <div className="min-w-0">
                {/* TITLE + STATUS */}
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-medium sm:text-base">
                    {task.title}
                  </p>

                  <StatusPill status={task.status} />
                </div>

                {/* DESCRIPTION */}
                <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs sm:text-sm">
                  {task.description}
                </p>

                {/* META */}
                <p className="text-muted-foreground mt-1 text-[10px] sm:text-xs">
                  {task.assignee.name} • {task.time}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <button
              className="opacity-100 transition group-hover:opacity-100 sm:opacity-0"
              title="actions"
            >
              <MoreHorizontal className="text-muted-foreground hover:text-foreground h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
