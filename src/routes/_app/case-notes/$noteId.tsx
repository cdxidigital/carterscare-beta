import { createFileRoute } from "@tanstack/react-router";
import { NoteDetailScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/case-notes/$noteId")({
  component: function NoteRoute() {
    const { noteId } = Route.useParams();
    return <NoteDetailScreen noteId={noteId} />;
  },
});
