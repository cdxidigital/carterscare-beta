import { createFileRoute } from "@tanstack/react-router";
import { WorkerCheckInScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/worker/check-in")({ component: WorkerCheckInScreen });
