'use server';

import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Role, UserStatus } from '@prisma/client';

export async function syncUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.email) return null;

  let dbUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  // CREATE USER (first login)
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.email,
        name:
          user.given_name && user.family_name
            ? `${user.given_name} ${user.family_name}`
            : (user.given_name ?? ''),
        image: user.picture ?? '',

        role: Role.EMPLOYEE,
        status: UserStatus.PENDING,

        lastLoginAt: new Date(),
      },
    });
  } else {
    // UPDATE LOGIN TIME ONLY
    dbUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }

  return dbUser;
}

/**
 * Get current logged-in user with relations
 */
export async function getCurrentUser() {
  const { getUser } = getKindeServerSession();
  const authUser = await getUser();

  if (!authUser?.email) return null;

  return prisma.user.findUnique({
    where: {
      email: authUser.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      companyId: true,
      lastLoginAt: true,
      company: true,
    },
  });
}

/**
 * Update last login timestamp
 */
export async function updateLastLogin(email: string) {
  if (!email) return;

  await prisma.user.update({
    where: { email },
    data: {
      lastLoginAt: new Date(),
    },
  });
}

/**
 * Protect server actions / APIs
 */
export async function requireUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.email) {
    throw new Error('Unauthorized');
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
    include: {
      company: true,
    },
  });

  if (!dbUser) {
    throw new Error('User not found in DB');
  }

  return dbUser;
}
