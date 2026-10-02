import { createFileRoute } from "@tanstack/react-router";
import { StaffDetailScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/staff/$staffId")({
  component: function StaffRoute() {
    const { staffId } = Route.useParams();
    return <StaffDetailScreen staffId={staffId} />;
  },
});
