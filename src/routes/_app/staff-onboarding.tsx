import { createFileRoute } from "@tanstack/react-router";
import { StaffOnboardingScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/staff-onboarding")({ component: StaffOnboardingScreen });
