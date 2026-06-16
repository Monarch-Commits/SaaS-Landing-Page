'use server';

import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { requireUser } from '../user';

export async function createInvite(companyId: string) {
  const user = await requireUser();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const invite = await prisma.invite.create({
    data: {
      token: randomUUID(),
      companyId,
      createdById: user.id,
      email: user.email,
      expiresAt,
    },
  });

  return `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invite.token}`;
}
