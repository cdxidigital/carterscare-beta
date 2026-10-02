import { createFileRoute } from "@tanstack/react-router";
import { ClientsScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/clients/")({ component: ClientsScreen });
