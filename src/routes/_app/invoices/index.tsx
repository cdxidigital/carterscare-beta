import { createFileRoute } from "@tanstack/react-router";
import { InvoicesScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/invoices/")({ component: InvoicesScreen });
