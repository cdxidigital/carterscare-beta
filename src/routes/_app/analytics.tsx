import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/analytics")({ component: AnalyticsScreen });
