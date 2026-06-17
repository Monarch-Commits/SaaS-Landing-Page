'use server';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/app/actions/user';
import { redirect } from 'next/navigation';
import { InviteStatus, UserStatus } from '@prisma/client';

export async function acceptInvite(formData: FormData): Promise<void> {
  const user = await requireUser();

  // ✅ Kuha ng token sa FormData
  const token = formData.get('token')?.toString()?.trim();

  if (!token) {
    throw new Error('MISSING_INVITE_TOKEN');
  }

  const invite = await prisma.invite.findUnique({
    where: { token },
  });

  if (!invite) {
    throw new Error('INVALID_INVITE_TOKEN');
  }

  if (invite.status !== InviteStatus.PENDING) {
    throw new Error('INVITE_ALREADY_USED');
  }

  if (invite.expiresAt && invite.expiresAt < new Date()) {
    throw new Error('INVITE_EXPIRED');
  }

  if (invite.email !== user.email) {
    throw new Error('INVITE_EMAIL_MISMATCH');
  }

  if (user.companyId) {
    throw new Error('USER_ALREADY_HAS_COMPANY');
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: {
          companyId: invite.companyId,
          role: invite.role,
          status: UserStatus.PENDING,
        },
      });

      await tx.invite.update({
        where: { id: invite.id },
        data: {
          status: InviteStatus.ACCEPTED,
          acceptedById: user.id,
        },
      });
    });
  } catch (error) {
    console.error('Accept invite failed:', error);
    throw new Error('Failed to accept invite. Please try again.');
  }

  redirect('/pending-approval');
}
