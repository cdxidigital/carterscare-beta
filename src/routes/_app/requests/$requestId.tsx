import { createFileRoute } from "@tanstack/react-router";
import { RequestDetailScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/requests/$requestId")({
  component: function RequestRoute() {
    const { requestId } = Route.useParams();
    return <RequestDetailScreen requestId={requestId} />;
  },
});
