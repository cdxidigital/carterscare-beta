import { createFileRoute } from "@tanstack/react-router";
import { MyTimesheetsScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/my-timesheets")({ component: MyTimesheetsScreen });
