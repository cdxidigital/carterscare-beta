import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/notes")({
  beforeLoad: () => {
    throw redirect({ to: "/case-notes" as never });
  },
  component: () => null,
});
