import { createFileRoute } from "@tanstack/react-router";
import { RosterScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/roster")({ component: RosterScreen });
