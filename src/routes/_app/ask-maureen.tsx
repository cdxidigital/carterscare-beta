import { createFileRoute } from "@tanstack/react-router";
import { MaureenScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/ask-maureen")({ component: MaureenScreen });
