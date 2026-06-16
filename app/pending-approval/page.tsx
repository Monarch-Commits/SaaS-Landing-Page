export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold">Waiting for Approval</h1>

        <p className="text-muted-foreground mt-3">
          Your profile has been submitted.
        </p>

        <p className="text-muted-foreground mt-2">
          Please wait for the owner or manager to approve your account.
        </p>
      </div>
    </div>
  );
}
