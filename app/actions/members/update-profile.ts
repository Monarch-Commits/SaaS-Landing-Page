'use server';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/app/actions/user';
import { redirect } from 'next/navigation';
import { InviteStatus, UserStatus } from '@prisma/client';

export async function updateProfile(formData: FormData): Promise<void> {
  const user = await requireUser();

  const token = formData.get('token')?.toString();
  if (!token) {
    throw new Error('Missing invite token');
  }

  // 1. Fetch the invite and check security validity
  const invite = await prisma.invite.findUnique({
    where: { token },
  });

  if (!invite) {
    throw new Error('Invalid invite token');
  }

  if (invite.status !== InviteStatus.PENDING) {
    throw new Error('This invite has already been used or cancelled');
  }

  if (invite.expiresAt && invite.expiresAt < new Date()) {
    throw new Error('This invite link has expired');
  }

  const name = formData.get('name')?.toString() || '';
  const image = formData.get('image')?.toString() || null;

  // 2. Execute user update & invite consumption atomically
  try {
    await prisma.$transaction(async (tx) => {
      // Update the user details and attach to company
      await tx.user.update({
        where: { id: user.id },
        data: {
          name,
          image,
          companyId: invite.companyId,
          role: invite.role,
          status: UserStatus.PENDING, // Awaiting admin activation
        },
      });

      // Secure the invite so it can never be used again
      await tx.invite.update({
        where: { id: invite.id },
        data: {
          status: InviteStatus.ACCEPTED,
          acceptedById: user.id,
        },
      });
    });
  } catch (error) {
    console.error('Onboarding transaction failed:', error);
    throw new Error('Failed to process onboarding. Please try again.');
  }

  // 3. Redirect outside the business logic execution blocks
  redirect('/pending-approval');
}
