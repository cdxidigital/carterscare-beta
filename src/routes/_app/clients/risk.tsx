import { createFileRoute } from "@tanstack/react-router";
import { RiskScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/clients/risk")({ component: RiskScreen });
