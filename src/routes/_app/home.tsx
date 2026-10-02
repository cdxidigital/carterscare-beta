import { createFileRoute } from "@tanstack/react-router";
import { DashboardScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/home")({ component: DashboardScreen });
