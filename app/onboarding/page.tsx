import { prisma } from '@/lib/prisma';

import { updateProfile } from '@/app/actions/members/update-profile';

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
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="bg-card w-full max-w-md rounded-3xl border p-8 shadow-lg">
        {/* HEADER */}

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">
            Welcome to {invite.company.name}
          </h1>

          <p className="text-muted-foreground mt-2">
            Complete your profile to request access.
          </p>
        </div>

        {/* FORM */}

        <form action={updateProfile} className="space-y-4">
          {/* IMPORTANT: token hidden field */}

          <input type="hidden" name="token" value={token} />

          <div>
            <label className="mb-1 block text-sm">Full Name</label>

            <input
              name="name"
              required
              className="w-full rounded-xl border p-3"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">Avatar URL</label>

            <input
              name="image"
              className="w-full rounded-xl border p-3"
              placeholder="https://..."
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 text-white"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
