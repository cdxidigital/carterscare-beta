import { createFileRoute } from "@tanstack/react-router";
import { TimesheetsScreen } from "@/features/cc/screens";
import { deskSearch } from "@/lib/cc/nav";

export const Route = createFileRoute("/_app/timesheets/")({
  validateSearch: deskSearch,
  component: TimesheetsScreen,
});
