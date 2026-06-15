'use server';

import { prisma } from '@/lib/prisma';
import { requireUser } from './user';
import { revalidatePath } from 'next/cache';
import { TaskPriority, TaskStatus } from '@prisma/client';

export async function createTask(formData: FormData) {
  const user = await requireUser();

  const title = formData.get('title')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const assignedToId = formData.get('assignedToId')?.toString();

  if (!title) throw new Error('Title is required');
  if (!user.companyId) throw new Error('No company assigned');

  const task = await prisma.task.create({
    data: {
      title,
      description: description || null,

      status: TaskStatus.PENDING,
      priority: TaskPriority.MEDIUM,

      companyId: user.companyId,
      createdById: user.id,

      assignedToId: assignedToId || null,
    },
  });

  revalidatePath('/dashboard');
  return task;
}
