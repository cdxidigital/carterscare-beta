import { createFileRoute } from "@tanstack/react-router";
import { IncidentsScreen } from "@/features/cc/screens";
import { deskSearch } from "@/lib/cc/nav";

export const Route = createFileRoute("/_app/incidents/")({
  validateSearch: deskSearch,
  component: IncidentsScreen,
});
