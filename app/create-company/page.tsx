import { createCompany } from '../actions/owner/company';

export default function CreateCompanyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-white">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl">
          <h1 className="text-center text-2xl font-semibold">
            Create your company
          </h1>

          <p className="mt-2 text-center text-sm text-neutral-400">
            Start your workspace in seconds
          </p>

          {/* SERVER ACTION FORM */}
          <form action={createCompany} className="mt-6 space-y-4">
            <input
              name="name"
              type="text"
              placeholder="e.g. Flow AI Inc."
              className="mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 focus:ring-2 focus:ring-white/20 focus:outline-none"
              required
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-white py-3 font-medium text-black hover:bg-neutral-200"
            >
              Create Company
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-neutral-500">
            You will become the owner automatically
          </p>
        </div>
      </div>
    </div>
  );
}
