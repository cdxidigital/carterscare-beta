import { createFileRoute } from "@tanstack/react-router";
import { ReportsScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/reports")({ component: ReportsScreen });
