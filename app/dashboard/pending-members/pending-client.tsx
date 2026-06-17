'use client';

import { useMemo, useState } from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';

type PendingMember = {
  id: string;
  email: string;
  image: string | null;
  role: 'OWNER' | 'EMPLOYEE' | 'MANAGER';
  createdAt: Date;
};

function getInitials(email: string) {
  return email
    .split('@')[0]
    .split('.')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function PendingClient({
  initialMembers,
}: {
  initialMembers: PendingMember[];
}) {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return members.filter((m) =>
      m.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [members, search]);

  async function approve(id: string) {
    setLoadingId(id);

    // TEMP: replace with server action later
    await new Promise((r) => setTimeout(r, 500));

    setMembers((prev) => prev.filter((m) => m.id !== id));

    setLoadingId(null);
  }

  async function reject(id: string) {
    setLoadingId(id);

    // TEMP: replace with server action later
    await new Promise((r) => setTimeout(r, 500));

    setMembers((prev) => prev.filter((m) => m.id !== id));

    setLoadingId(null);
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-foreground text-background flex h-10 w-10 items-center justify-center rounded-xl">
            <User size={18} />
          </div>

          <div>
            <h1 className="text-lg font-semibold md:text-xl">
              Pending Members
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm">
              Review join requests before granting access
            </p>
          </div>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search email..."
          className="bg-muted/30 w-full rounded-lg border px-3 py-2 text-sm outline-none md:w-72"
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-muted-foreground text-xs">Pending</p>
          <p className="text-lg font-semibold">{members.length}</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-muted-foreground text-xs">Managers</p>
          <p className="text-lg font-semibold">
            {members.filter((m) => m.role === 'MANAGER').length}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-muted-foreground text-xs">Employees</p>
          <p className="text-lg font-semibold">
            {members.filter((m) => m.role === 'EMPLOYEE').length}
          </p>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden rounded-xl border md:block">
        <div className="text-muted-foreground grid grid-cols-12 border-b p-3 text-xs">
          <div className="col-span-5">User</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-3">Requested</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-muted-foreground p-10 text-center text-sm">
            No pending members found
          </div>
        ) : (
          filtered.map((m) => (
            <div
              key={m.id}
              className="hover:bg-muted/30 grid grid-cols-12 items-center p-3 text-sm"
            >
              {/* USER */}
              <div className="col-span-5 flex items-center gap-3">
                <Image
                  src={
                    m.image ||
                    'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma'
                  }
                  alt="user"
                  width={36}
                  height={36}
                  className="shrink-0 rounded-full"
                />
                <span className="font-medium">{m.email}</span>
              </div>

              {/* ROLE */}
              <div className="col-span-2 text-xs">
                <span
                  className={`rounded-full px-2 py-1 ${
                    m.role === 'MANAGER'
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'bg-emerald-500/10 text-emerald-500'
                  }`}
                >
                  {m.role}
                </span>
              </div>

              {/* DATE */}
              <div className="text-muted-foreground col-span-3 text-xs">
                {new Date(m.createdAt).toLocaleDateString()}
              </div>

              {/* ACTIONS */}
              <div className="col-span-2 flex justify-end gap-2">
                <button
                  onClick={() => reject(m.id)}
                  className="bg-muted rounded-lg px-3 py-1 text-xs"
                >
                  Reject
                </button>

                <button
                  onClick={() => approve(m.id)}
                  disabled={loadingId === m.id}
                  className="rounded-lg bg-black px-3 py-1 text-xs text-white"
                >
                  {loadingId === m.id ? '...' : 'Approve'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MOBILE CARDS */}
      <div className="space-y-3 md:hidden">
        {filtered.length === 0 ? (
          <div className="text-muted-foreground rounded-xl border p-6 text-center text-sm">
            No pending members found
          </div>
        ) : (
          filtered.map((m) => (
            <div key={m.id} className="space-y-3 rounded-xl border p-4">
              {/* USER */}
              <div className="flex items-center gap-3">
                <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold">
                  {getInitials(m.email)}
                </div>

                <div>
                  <p className="text-sm font-medium">{m.email}</p>
                  <p className="text-muted-foreground text-xs">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* ROLE */}
              <div className="text-xs">
                <span
                  className={`rounded-full px-2 py-1 ${
                    m.role === 'MANAGER'
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'bg-emerald-500/10 text-emerald-500'
                  }`}
                >
                  {m.role}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => reject(m.id)}
                  className="bg-muted w-full rounded-lg py-2 text-xs"
                >
                  Reject
                </button>

                <button
                  onClick={() => approve(m.id)}
                  disabled={loadingId === m.id}
                  className="w-full rounded-lg bg-black py-2 text-xs text-white"
                >
                  {loadingId === m.id ? '...' : 'Approve'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
