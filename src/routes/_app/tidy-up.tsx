import { createFileRoute } from "@tanstack/react-router";
import { TidyUpScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/tidy-up")({ component: TidyUpScreen });
