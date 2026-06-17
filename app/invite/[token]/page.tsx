import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { InviteStatus } from '@prisma/client';
import { redirect } from 'next/navigation';

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // ✅ Check if naka-login na — skip login/register
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (kindeUser) {
    redirect(`/onboarding?token=${token}`);
  }

  const invite = await prisma.invite.findUnique({
    where: { token },
    include: { company: true },
  });

  const isExpired = invite?.expiresAt && invite.expiresAt < new Date();
  const isInvalid =
    !invite || invite.status !== InviteStatus.PENDING || isExpired;

  // ✅ Invalid invite
  if (isInvalid) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="border-border bg-card w-full max-w-md rounded-3xl border p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
            ✕
          </div>
          <h1 className="text-2xl font-bold">Invalid Invite</h1>
          <p className="text-muted-foreground mt-2">
            This invitation link is invalid, has expired, or has already been
            used.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="from-background via-background to-muted/30 flex min-h-screen items-center justify-center bg-linear-to-b px-4">
      <div className="border-border bg-card/80 w-full max-w-md rounded-3xl border p-8 shadow-xl backdrop-blur">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold">
            {invite.company.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Join {invite.company.name}
          </h1>

          <p className="text-muted-foreground mt-2">
            You've been invited to join this workspace.
          </p>

          {/* ✅ Show invite email para alam ng user kung para kanino */}
          <p className="text-muted-foreground mt-1 text-sm">
            Invite sent to{' '}
            <span className="text-foreground font-medium">{invite.email}</span>
          </p>
        </div>

        {/* ✅ Expiry warning */}
        {invite.expiresAt && (
          <p className="text-muted-foreground mb-4 text-center text-xs">
            Expires{' '}
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }).format(invite.expiresAt)}
          </p>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <RegisterLink
            postLoginRedirectURL={`/onboarding?token=${token}`}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-11 w-full items-center justify-center rounded-xl font-medium transition"
          >
            Create Account
          </RegisterLink>

          <LoginLink
            postLoginRedirectURL={`/onboarding?token=${token}`}
            className="border-border hover:bg-muted flex h-11 w-full items-center justify-center rounded-xl border font-medium transition"
          >
            I Already Have an Account
          </LoginLink>
        </div>
      </div>
    </div>
  );
}
