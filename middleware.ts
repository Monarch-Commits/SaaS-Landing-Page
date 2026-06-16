import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';

export default withAuth({
  isReturnToCurrentPage: true,
});

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding', '/pending-approval'],
};
