import { createFileRoute } from "@tanstack/react-router";
import { OnboardingScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/onboarding")({ component: OnboardingScreen });
