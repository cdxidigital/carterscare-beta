import { createFileRoute } from "@tanstack/react-router";
import { NotesScreen } from "@/features/cc/screens";
import { deskSearch } from "@/lib/cc/nav";

export const Route = createFileRoute("/_app/case-notes/")({
  validateSearch: deskSearch,
  component: NotesScreen,
});
