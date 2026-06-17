'use server';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/app/actions/user';
import { Role, UserStatus } from '@prisma/client';

// ✅ Get all pending members
export async function getPendingMembers() {
  const user = await requireUser();

  if (user.role !== Role.OWNER && user.role !== Role.MANAGER) {
    throw new Error('FORBIDDEN');
  }

  return prisma.user.findMany({
    where: {
      companyId: user.companyId!,
      status: UserStatus.PENDING,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
    },
  });
}

// ✅ Approve member — ACTIVE na
export async function approveMember(memberId: string) {
  const user = await requireUser();

  if (user.role !== Role.OWNER && user.role !== Role.MANAGER) {
    throw new Error('FORBIDDEN');
  }

  const member = await prisma.user.findUnique({
    where: { id: memberId },
  });

  if (!member) {
    throw new Error('USER_NOT_FOUND');
  }

  if (member.companyId !== user.companyId) {
    throw new Error('FORBIDDEN_DIFFERENT_COMPANY');
  }

  if (member.status !== UserStatus.PENDING) {
    throw new Error('USER_NOT_PENDING');
  }

  return prisma.user.update({
    where: { id: memberId },
    data: { status: UserStatus.ACTIVE },
  });
}

// ✅ Reject member — i-detach sa company
export async function rejectMember(memberId: string) {
  const user = await requireUser();

  if (user.role !== Role.OWNER && user.role !== Role.MANAGER) {
    throw new Error('FORBIDDEN');
  }

  const member = await prisma.user.findUnique({
    where: { id: memberId },
  });

  if (!member) {
    throw new Error('USER_NOT_FOUND');
  }

  if (member.companyId !== user.companyId) {
    throw new Error('FORBIDDEN_DIFFERENT_COMPANY');
  }

  if (member.status !== UserStatus.PENDING) {
    throw new Error('USER_NOT_PENDING');
  }

  return prisma.user.update({
    where: { id: memberId },
    data: {
      companyId: null,
      role: Role.EMPLOYEE,
      status: UserStatus.PENDING,
    },
  });
}

// ✅ Suspend member — hindi ma-access ang system
export async function suspendMember(memberId: string) {
  const user = await requireUser();

  if (user.role !== Role.OWNER && user.role !== Role.MANAGER) {
    throw new Error('FORBIDDEN');
  }

  const member = await prisma.user.findUnique({
    where: { id: memberId },
  });

  if (!member) {
    throw new Error('USER_NOT_FOUND');
  }

  if (member.companyId !== user.companyId) {
    throw new Error('FORBIDDEN_DIFFERENT_COMPANY');
  }

  // ✅ Hindi pwedeng i-suspend ang Owner
  if (member.role === Role.OWNER) {
    throw new Error('CANNOT_SUSPEND_OWNER');
  }

  if (member.status === UserStatus.SUSPENDED) {
    throw new Error('USER_ALREADY_SUSPENDED');
  }

  return prisma.user.update({
    where: { id: memberId },
    data: { status: UserStatus.SUSPENDED },
  });
}

// ✅ Unsuspend member — ACTIVE ulit
export async function unsuspendMember(memberId: string) {
  const user = await requireUser();

  if (user.role !== Role.OWNER && user.role !== Role.MANAGER) {
    throw new Error('FORBIDDEN');
  }

  const member = await prisma.user.findUnique({
    where: { id: memberId },
  });

  if (!member) {
    throw new Error('USER_NOT_FOUND');
  }

  if (member.companyId !== user.companyId) {
    throw new Error('FORBIDDEN_DIFFERENT_COMPANY');
  }

  if (member.status !== UserStatus.SUSPENDED) {
    throw new Error('USER_NOT_SUSPENDED');
  }

  return prisma.user.update({
    where: { id: memberId },
    data: { status: UserStatus.ACTIVE },
  });
}

// ✅ Remove member — i-detach sa company
export async function removeMember(memberId: string) {
  const user = await requireUser();

  // ✅ Owner lang pwede mag-remove
  if (user.role !== Role.OWNER) {
    throw new Error('FORBIDDEN_OWNER_ONLY');
  }

  const member = await prisma.user.findUnique({
    where: { id: memberId },
  });

  if (!member) {
    throw new Error('USER_NOT_FOUND');
  }

  if (member.companyId !== user.companyId) {
    throw new Error('FORBIDDEN_DIFFERENT_COMPANY');
  }

  // ✅ Hindi pwedeng i-remove ang sarili
  if (member.id === user.id) {
    throw new Error('CANNOT_REMOVE_YOURSELF');
  }

  return prisma.user.update({
    where: { id: memberId },
    data: {
      companyId: null,
      role: Role.EMPLOYEE,
      status: UserStatus.PENDING,
    },
  });
}
