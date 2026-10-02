import { createFileRoute } from "@tanstack/react-router";
import { WorkerHomeScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/worker/")({ component: WorkerHomeScreen });
