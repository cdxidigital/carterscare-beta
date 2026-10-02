import { createFileRoute } from "@tanstack/react-router";
import { ClientPortalScreen } from "@/features/cc/client-portal";

export const Route = createFileRoute("/_app/client-portal")({ component: ClientPortalScreen });
