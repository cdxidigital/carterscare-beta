import { createFileRoute } from "@tanstack/react-router";
import { TimesheetDetailScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/timesheets/$timesheetId")({
  component: function TimesheetRoute() {
    const { timesheetId } = Route.useParams();
    return <TimesheetDetailScreen timesheetId={timesheetId} />;
  },
});
