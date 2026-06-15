import { updateProfile } from '@/app/actions/members/update-profile';
import { requireUser } from '@/app/actions/user';
import { SubmitButton } from '@/components/dashboard/button/profileButton';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export default async function ProfilePage() {
  const sessionUser = await requireUser();

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="bg-card w-full max-w-md space-y-6 rounded-2xl border p-6 shadow-sm">
        <h1 className="text-xl font-bold">Your Profile</h1>

        <form action={updateProfile} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm">Name</label>
            <input
              name="name"
              defaultValue={user.name ?? ''}
              className="w-full rounded-xl border p-2"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-1">
            <Image
              src={
                user?.image ||
                'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma'
              }
              alt="user"
              width={36}
              height={36}
              className="shrink-0 rounded-full"
            />
            <label className="text-sm">Image URL</label>
            <input
              name="image"
              defaultValue={user.image ?? ''}
              className="w-full rounded-xl border p-2"
              placeholder="https://..."
            />
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
