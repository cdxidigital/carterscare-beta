import { createFileRoute } from "@tanstack/react-router";
import { RequestsScreen } from "@/features/cc/screens";
import { deskSearch } from "@/lib/cc/nav";

export const Route = createFileRoute("/_app/requests/")({
  validateSearch: deskSearch,
  component: RequestsScreen,
});
