import { createFileRoute } from "@tanstack/react-router";
import { HrScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/staff/hr")({ component: HrScreen });
