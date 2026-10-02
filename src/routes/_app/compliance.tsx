import { createFileRoute } from "@tanstack/react-router";
import { ComplianceScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/compliance")({ component: ComplianceScreen });
