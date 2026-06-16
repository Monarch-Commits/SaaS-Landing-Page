'use server';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/app/actions/user';
import { redirect } from 'next/navigation';

export async function getPendingMembers() {
  const user = await requireUser();

  if (!user.companyId) return [];

  const members = await prisma.user.findMany({
    where: {
      companyId: user.companyId,
      status: 'PENDING',
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return members;
}

export async function checkAccessToDashboard() {
  const user = await requireUser();

  if (user.status === 'PENDING') {
    redirect('/pending-approval');
  }

  if (!user.companyId) {
    redirect('/create-company');
  }

  return user;
}
