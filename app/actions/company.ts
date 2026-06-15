'use server';

import { prisma } from '@/lib/prisma';
import { Role, UserStatus } from '@prisma/client';
import { requireUser } from './user';
import { redirect } from 'next/navigation';

export async function requireManager() {
  const user = await requireUser();

  if (user.role !== Role.MANAGER) {
    throw new Error('Forbidden: Manager only');
  }

  return user;
}

export async function requireCompany() {
  const user = await requireUser();

  if (!user.companyId) {
    throw new Error('No company assigned');
  }

  return user;
}

export async function requireCompanyOwner() {
  const user = await requireUser();

  const company = await prisma.company.findUnique({
    where: {
      ownerId: user.id,
    },
  });

  if (!company) {
    throw new Error('Forbidden: Not company owner');
  }

  return { user, company };
}

export async function createCompany(formData: FormData) {
  const name = formData.get('name') as string;

  if (!name) {
    throw new Error('Company name is required');
  }

  const user = await requireUser();

  const existing = await prisma.company.findFirst({
    where: { ownerId: user.id },
  });

  if (existing) {
    redirect('/dashboard');
  }

  const company = await prisma.company.create({
    data: {
      name,
      ownerId: user.id,
    },
  });
  console.log('COMPANY CREATED:', company);

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      companyId: company.id, // ✅ IMPORTANT FIX
      role: 'MANAGER',
      status: 'ACTIVE',
    },
  });
  console.log('USER AFTER:', updatedUser);

  redirect('/dashboard');
}

export async function acceptInvite(token: string) {
  const user = await requireUser();

  if (user.companyId) {
    throw new Error('User already belongs to a company');
  }

  const invite = await prisma.invite.findUnique({
    where: { token },
  });

  if (!invite) throw new Error('Invalid invite');

  if (invite.status !== 'PENDING') {
    throw new Error('Invite already used');
  }

  if (invite.expiresAt && invite.expiresAt < new Date()) {
    throw new Error('Invite expired');
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: user.id },
      data: {
        companyId: invite.companyId,
        role: invite.role,
        status: UserStatus.ACTIVE,
      },
    });

    await tx.invite.update({
      where: { id: invite.id },
      data: {
        status: 'ACCEPTED',
        acceptedById: user.id,
      },
    });
  });

  return true;
}

export async function getUserCompany() {
  const user = await requireUser();

  const company = await prisma.company.findUnique({
    where: { id: user.companyId! },
  });

  return company;
}
