import { createFileRoute } from "@tanstack/react-router";
import { FinancialsScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/financials")({ component: FinancialsScreen });
