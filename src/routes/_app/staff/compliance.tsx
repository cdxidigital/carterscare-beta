import { createFileRoute } from "@tanstack/react-router";
import { StaffComplianceScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/staff/compliance")({ component: StaffComplianceScreen });
