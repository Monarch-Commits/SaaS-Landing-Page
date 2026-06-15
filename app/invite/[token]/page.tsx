import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const invite = await prisma.invite.findUnique({
    where: {
      token,
    },
    include: {
      company: true,
    },
  });

  if (!invite) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="border-border bg-card w-full max-w-md rounded-3xl border p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Invalid Invite</h1>
          <p className="text-muted-foreground mt-2">
            This invitation link is invalid or has expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="from-background via-background to-muted/30 flex min-h-screen items-center justify-center bg-linear-to-b px-4">
      <div className="border-border bg-card/80 w-full max-w-md rounded-3xl border p-8 shadow-xl backdrop-blur">
        <div className="mb-6 text-center">
          <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold">
            {invite.company.name.charAt(0)}
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Join {invite.company.name}
          </h1>

          <p className="text-muted-foreground mt-2">
            You've been invited to join this workspace.
          </p>
        </div>

        <div className="space-y-3">
          <RegisterLink
            postLoginRedirectURL={`/dashboard/profile?token=${token}`}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-11 w-full items-center justify-center rounded-xl font-medium transition"
          >
            Create Account
          </RegisterLink>

          <LoginLink
            postLoginRedirectURL={`/dashboard/profile?token=${token}`}
            className="border-border hover:bg-muted flex h-11 w-full items-center justify-center rounded-xl border font-medium transition"
          >
            I Already Have an Account
          </LoginLink>
        </div>

        <div className="text-muted-foreground mt-6 text-center text-sm">
          By continuing, you'll request access to{' '}
          <span className="text-foreground font-medium">
            {invite.company.name}
          </span>
          .
        </div>
      </div>
    </div>
  );
}
