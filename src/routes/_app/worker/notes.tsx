import { createFileRoute } from "@tanstack/react-router";
import { WorkerNotesScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/worker/notes")({ component: WorkerNotesScreen });
