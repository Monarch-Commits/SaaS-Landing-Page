'use server';

import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { requireUser } from '../user';

export async function createInvite(companyId: string) {
  const user = await requireUser();

  const invite = await prisma.invite.create({
    data: {
      token: randomUUID(),
      companyId,
      createdById: user.id,
      email: user.email, // email: optional lang kung gusto mo restrict later
    },
  });

  return `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invite.token}`;
}
