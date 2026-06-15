import { Users, Mail, Shield, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

type Member = {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'MANAGER' | 'EMPLOYEE';
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
};

const members: Member[] = [
  {
    id: '1',
    name: 'Juan Dela Cruz',
    email: 'juan@email.com',
    role: 'OWNER',
    status: 'ACTIVE',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    role: 'MANAGER',
    status: 'ACTIVE',
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@email.com',
    role: 'EMPLOYEE',
    status: 'PENDING',
  },
];

function statusStyle(status: Member['status']) {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-500/10 text-green-600';
    case 'PENDING':
      return 'bg-yellow-500/10 text-yellow-600';
    case 'SUSPENDED':
      return 'bg-red-500/10 text-red-600';
  }
}

function roleStyle(role: Member['role']) {
  switch (role) {
    case 'OWNER':
      return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    case 'MANAGER':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    case 'EMPLOYEE':
      return 'bg-muted text-muted-foreground';
  }
}

export default function TeamPage() {
  return (
    <div className="bg-background min-h-screen p-4 md:p-8">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-muted-foreground text-sm">
            Manage your company members
          </p>
        </div>

        <button className="bg-primary text-primary-foreground flex items-center gap-2 rounded-xl px-4 py-2 text-sm hover:opacity-90">
          <Users className="h-4 w-4" />
          Invite Member
        </button>
      </div>

      {/* GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-card hover:bg-muted/40 border-border flex flex-col gap-4 rounded-2xl border p-4 shadow-sm transition"
          >
            {/* TOP */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${member.name}`}
                  alt={member.name}
                  width={42}
                  height={42}
                  className="rounded-full"
                />

                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {member.email}
                  </p>
                </div>
              </div>

              <button
                title="ambot nime"
                className="hover:bg-muted rounded-lg p-2"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* ROLE + STATUS */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-2 py-1 text-xs ${roleStyle(
                  member.role,
                )}`}
              >
                {member.role}
              </span>

              <div className="flex items-center gap-1">
                <span
                  className={`h-2 w-2 rounded-full ${
                    member.status === 'ACTIVE'
                      ? 'bg-green-500'
                      : member.status === 'PENDING'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                />

                <span
                  className={`rounded-full px-2 py-1 text-xs ${statusStyle(
                    member.status,
                  )}`}
                >
                  {member.status}
                </span>
              </div>
            </div>

            {/* EMAIL ROW (mobile friendly extra info) */}
            <div className="text-muted-foreground flex items-center gap-2 text-xs md:hidden">
              <Mail className="h-3 w-3" />
              {member.email}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
