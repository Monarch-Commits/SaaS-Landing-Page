'use server';

import { prisma } from '@/lib/prisma';
import { requireUser } from '../user';
import { redirect } from 'next/navigation';
import { Role, UserStatus } from '@prisma/client';

// ✅ Check if user has a company on first login
export async function checkFirstLogin() {
  const user = await requireUser();

  // requireUser na nag-hahandle ng SUSPENDED,
  // so safe na mag-redirect dito
  if (!user.companyId) {
    redirect('/create-company');
  }

  return user;
}

// ✅ Require user to have a company (any role)
export async function requireCompany() {
  const user = await requireUser();

  if (!user.companyId) {
    throw new Error('NO_COMPANY_ASSIGNED');
  }

  return user;
}

// ✅ Require user to be the Owner (removed duplicate requireOwner)
export async function requireOwner() {
  const user = await requireUser();

  if (!user.companyId) {
    throw new Error('NO_COMPANY_ASSIGNED');
  }

  if (user.role !== Role.OWNER) {
    throw new Error('FORBIDDEN_OWNER_ONLY');
  }

  return user;
}

// ✅ Create company — with duplicate name handling
export async function createCompany(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();

  if (!name) {
    throw new Error('Company name is required');
  }

  const user = await requireUser();

  // Prevent owner from creating multiple companies
  const existingOwned = await prisma.company.findFirst({
    where: { ownerId: user.id },
  });

  if (existingOwned) {
    redirect('/dashboard');
  }

  // Check if company name is already taken
  const nameTaken = await prisma.company.findUnique({
    where: { name },
  });

  if (nameTaken) {
    throw new Error('COMPANY_NAME_TAKEN');
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

// ✅ Get current user's company
export async function getUserCompany() {
  const user = await requireUser();

  if (!user.companyId) return null;

  return prisma.company.findUnique({
    where: { id: user.companyId },
  });
}
