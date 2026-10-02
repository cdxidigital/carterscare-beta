import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/cc/shell";

export const Route = createFileRoute("/_app")({ component: AppShell });
