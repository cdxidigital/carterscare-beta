import { createFileRoute } from "@tanstack/react-router";
import { CheckInScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/check-in")({ component: CheckInScreen });
