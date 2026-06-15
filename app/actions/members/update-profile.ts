'use server';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/app/actions/user';

export async function updateProfile(formData: FormData) {
  try {
    const user = await requireUser();

    const name = formData.get('name') as string;
    const image = formData.get('image') as string;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        image: image || null,
      },
    });
  } catch (error) {
    console.error('UPDATE_PROFILE_ERROR:', error);
  }
}
