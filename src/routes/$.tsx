import { Link, createFileRoute } from "@tanstack/react-router";
import { homeFor } from "@/lib/cc/nav";
import { useSession } from "@/lib/cc/session";

export const Route = createFileRoute("/$")({
  component: function CatchAll() {
    const { session } = useSession();
    const to = homeFor(session?.role);
    return (
      <main className="mx-auto flex min-h-svh max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">This page is not on the floor</h1>
        <p className="text-muted">Every live desk is in the sidebar. This path does not match a record or a module.</p>
        <Link to={to as never} className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-fg">
          Return to your desk
        </Link>
      </main>
    );
  },
});
