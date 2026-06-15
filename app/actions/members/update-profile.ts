'use server';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/app/actions/user';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData): Promise<void> {
  const user = await requireUser();

  const name = formData.get('name')?.toString() || '';
  const image = formData.get('image')?.toString();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name,
      image: image && image.length > 0 ? image : null,
    },
  });

  revalidatePath('/dashboard/profile');
}
