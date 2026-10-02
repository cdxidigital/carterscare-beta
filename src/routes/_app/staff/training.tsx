import { createFileRoute } from "@tanstack/react-router";
import { TrainingScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/staff/training")({ component: TrainingScreen });
