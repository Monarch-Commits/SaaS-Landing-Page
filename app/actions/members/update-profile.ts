'use server';

import { prisma } from '@/lib/prisma';

import { redirect } from 'next/navigation';
import { InviteStatus, UserStatus } from '@prisma/client';
import { requireUser } from '@/lib/auth/user';

type ActionState = string | null;

export async function acceptInvite(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();

  const token = formData.get('token')?.toString()?.trim();
  const name = formData.get('name')?.toString()?.trim();
  const image = formData.get('image')?.toString()?.trim() || null;

  if (!token) return 'MISSING_INVITE_TOKEN';

  const invite = await prisma.invite.findUnique({
    where: { token },
  });

  if (!invite) return 'INVALID_INVITE_TOKEN';

  if (invite.status !== InviteStatus.PENDING) {
    return 'INVITE_ALREADY_USED';
  }

  if (invite.expiresAt && invite.expiresAt < new Date()) {
    return 'INVITE_EXPIRED';
  }

  if (invite.email !== user.email) {
    return 'INVITE_EMAIL_MISMATCH';
  }

  if (user.companyId) {
    return 'USER_ALREADY_HAS_COMPANY';
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: {
          name,
          image,
          companyId: invite.companyId,
          role: invite.role,
          status: UserStatus.PENDING, // 👈 IMPORTANT
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
    return 'SERVER_ERROR';
  }

  redirect('/pending-approval');
}
