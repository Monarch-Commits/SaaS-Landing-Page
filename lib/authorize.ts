import { redirect } from 'next/navigation';

export function authorize(user: any, allowedRoles: string[]) {
  if (!allowedRoles.includes(user.role)) {
    redirect('/403');
  }

  if (user.status !== 'ACTIVE') {
    redirect('/waiting-approval');
  }
}

// Ganito siya gamitin
// import { requireUser } from "@/app/actions/user";
// import { authorize } from "@/lib/authorize";
// import { permissions } from "@/lib/permissions";

// export default async function OwnerPage() {
//   const user = await requireUser();

//   authorize(user, permissions.ownerPanel);

//   return <div>Owner Panel</div>;
// }
