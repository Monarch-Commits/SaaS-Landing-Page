'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Role, UserStatus } from '@prisma/client';

export async function syncUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.email) return null;

  const name =
    [user.given_name, user.family_name].filter(Boolean).join(' ') ||
    'Anonymous';

  const image = user.picture ?? null;

  const dbUser = await prisma.user.upsert({
    where: { email: user.email },
    create: {
      email: user.email,
      name,
      image,
      role: Role.EMPLOYEE,
      status: UserStatus.PENDING,
      lastLoginAt: new Date(),
    },
    update: {
      name,
      image,
      lastLoginAt: new Date(),
      // NOTE: role at status ay hindi ino-overwrite para mapreserve ang existing values
    },
  });

  return dbUser;
}

export async function getCurrentUser() {
  const { getUser } = getKindeServerSession();
  const authUser = await getUser();

  if (!authUser?.email) return null;

  return prisma.user.findUnique({
    where: { email: authUser.email },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
      status: true,
      companyId: true,
      lastLoginAt: true,
      company: true,
    },
  });
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  if (user.status === UserStatus.SUSPENDED) {
    throw new Error('Account suspended');
  }

  return user;
}
