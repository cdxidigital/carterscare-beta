import { createFileRoute } from "@tanstack/react-router";
import { StaffScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/staff/")({ component: StaffScreen });
