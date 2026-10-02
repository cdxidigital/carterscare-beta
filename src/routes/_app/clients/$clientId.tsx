import { createFileRoute } from "@tanstack/react-router";
import { ClientDetailScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/clients/$clientId")({
  component: function ClientRoute() {
    const { clientId } = Route.useParams();
    return <ClientDetailScreen clientId={clientId} />;
  },
});
