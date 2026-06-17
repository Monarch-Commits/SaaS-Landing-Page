'use server';

import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { requireUser } from '../user';
import { Role } from '@prisma/client';

export async function createInvite(email: string) {
  const user = await requireUser();

  // ✅ Owner at Manager lang pwede mag-invite
  if (user.role !== Role.OWNER && user.role !== Role.MANAGER) {
    throw new Error('FORBIDDEN — Only Owner or Manager can invite');
  }

  // ✅ Dapat may company yung nag-iinvite
  if (!user.companyId) {
    throw new Error('NO_COMPANY_ASSIGNED');
  }

  // ✅ Validate email
  if (!email?.trim()) {
    throw new Error('Email is required');
  }

  // ✅ Check if email already a member ng company
  const alreadyMember = await prisma.user.findFirst({
    where: {
      email,
      companyId: user.companyId,
    },
  });

  if (alreadyMember) {
    throw new Error('USER_ALREADY_A_MEMBER');
  }

  // ✅ Check if may existing pending invite pa
  const existingInvite = await prisma.invite.findFirst({
    where: {
      email,
      companyId: user.companyId,
      status: 'PENDING',
    },
  });

  if (existingInvite) {
    throw new Error('INVITE_ALREADY_SENT');
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const invite = await prisma.invite.create({
    data: {
      token: randomUUID(),
      companyId: user.companyId, // ✅ Galing sa user, hindi sa parameter
      createdById: user.id,
      email, // ✅ Email ng iina-invite, hindi ng nag-iinvite
      expiresAt,
    },
  });

  return `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invite.token}`;
}
