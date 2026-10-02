import { createFileRoute } from "@tanstack/react-router";
import { MyComplianceScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/my-compliance")({ component: MyComplianceScreen });
