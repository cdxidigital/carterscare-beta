import { createFileRoute } from "@tanstack/react-router";
import { IncidentDetailScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/incidents/$incidentId")({
  component: function IncidentRoute() {
    const { incidentId } = Route.useParams();
    return <IncidentDetailScreen incidentId={incidentId} />;
  },
});
