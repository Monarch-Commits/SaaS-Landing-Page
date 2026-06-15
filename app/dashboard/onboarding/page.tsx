import { prisma } from '@/lib/prisma';

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <div>Missing invite token</div>;
  }

  const invite = await prisma.invite.findUnique({
    where: {
      token,
    },
    include: {
      company: true,
    },
  });

  if (!invite) {
    return <div>Invalid invite</div>;
  }

  return (
    <div>
      <h1>Welcome to {invite.company.name}</h1>
      <p>Complete your profile.</p>
    </div>
  );
}
