import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { LoginPage } from "@/features/cc/login-page";
import { homeFor } from "@/lib/cc/nav";
import { useSession } from "@/lib/cc/session";

export const Route = createFileRoute("/login")({ component: LoginRoute });

function LoginRoute() {
  const { session, ready } = useSession();
  useEffect(() => {
    if (!ready || !session) return;
    const to = homeFor(session.role);
    if (window.location.pathname !== to) window.location.assign(to);
  }, [ready, session]);
  return <LoginPage />;
}
