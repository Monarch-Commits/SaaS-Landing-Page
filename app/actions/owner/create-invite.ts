'use server';

import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { Role, InviteStatus } from '@prisma/client';
import { requireUser } from '@/lib/auth/user';

export async function createInvite(email: string) {
  const user = await requireUser();

  // 🔐 Only OWNER / MANAGER can invite
  if (user.role !== Role.OWNER && user.role !== Role.MANAGER) {
    throw new Error('FORBIDDEN_ONLY_OWNER_OR_MANAGER');
  }

  // 🏢 Must belong to a company
  if (!user.companyId) {
    throw new Error('NO_COMPANY_ASSIGNED');
  }

  // 📧 Validate email
  const cleanEmail = email?.trim().toLowerCase();
  if (!cleanEmail) {
    throw new Error('EMAIL_REQUIRED');
  }

  // 👤 Check if already a member
  const alreadyMember = await prisma.user.findFirst({
    where: {
      email: cleanEmail,
      companyId: user.companyId,
    },
  });

  if (alreadyMember) {
    throw new Error('USER_ALREADY_MEMBER');
  }

  // 📩 Check existing pending invite
  const existingInvite = await prisma.invite.findFirst({
    where: {
      email: cleanEmail,
      companyId: user.companyId,
      status: InviteStatus.PENDING,
    },
  });

  if (existingInvite) {
    throw new Error('INVITE_ALREADY_SENT');
  }

  // ⏳ Expiry (7 days)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // 📦 Create invite
  const invite = await prisma.invite.create({
    data: {
      token: randomUUID(),
      email: cleanEmail,
      companyId: user.companyId,
      createdById: user.id,
      role: Role.EMPLOYEE,
      status: InviteStatus.PENDING,
      expiresAt,
    },
  });

  // 🌐 Base URL safety
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  return `${baseUrl}/invite/${invite.token}`;
}
