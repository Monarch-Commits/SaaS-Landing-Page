'use server';

import { prisma } from '@/lib/prisma';
import { requireUser } from '../user';
import { redirect } from 'next/navigation';
import { Role, UserStatus } from '@prisma/client';

export async function checkFirstLogin() {
  const user = await requireUser();

  if (!user.companyId) {
    redirect('/create-company');
  }

  return user;
}

export async function requireOwner() {
  const user = await requireUser();

  if (!user.companyId) {
    throw new Error('NO_COMPANY');
  }

  if (user.role !== Role.OWNER) {
    throw new Error('FORBIDDEN_OWNER_ONLY');
  }

  return user;
}

export async function requireCompany() {
  const user = await requireUser();

  if (!user.companyId) {
    throw new Error('NO_COMPANY_ASSIGNED');
  }

  return user;
}

export async function requireCompanyOwner() {
  const user = await requireUser();

  if (!user.companyId) {
    throw new Error('NO_COMPANY_ASSIGNED');
  }

  if (user.role !== Role.OWNER) {
    throw new Error('NOT_COMPANY_OWNER');
  }

  return user;
}

export async function createCompany(formData: FormData) {
  const name = formData.get('name') as string;

  if (!name?.trim()) {
    throw new Error('Company name is required');
  }

  const user = await requireUser();

  // prevent multiple companies per owner
  const existing = await prisma.company.findFirst({
    where: { ownerId: user.id },
  });

  if (existing) {
    redirect('/dashboard');
  }

  const result = await prisma.$transaction(async (tx) => {
    const company = await tx.company.create({
      data: {
        name,
        ownerId: user.id,
      },
    });

    const updatedUser = await tx.user.update({
      where: { id: user.id },
      data: {
        companyId: company.id,
        role: Role.OWNER,
        status: UserStatus.ACTIVE,
      },
    });

    return { company, updatedUser };
  });

  console.log('COMPANY CREATED:', result.company);

  redirect('/dashboard');
}

export async function getUserCompany() {
  const user = await requireUser();

  if (!user.companyId) {
    return null;
  }

  return prisma.company.findUnique({
    where: {
      id: user.companyId,
    },
  });
}
