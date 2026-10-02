import { createFileRoute } from "@tanstack/react-router";
import { MyRosterScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/my-roster")({ component: MyRosterScreen });
