import { createFileRoute } from "@tanstack/react-router";
import { InvoiceDetailScreen } from "@/features/cc/screens";

export const Route = createFileRoute("/_app/invoices/$invoiceId")({
  component: function InvoiceRoute() {
    const { invoiceId } = Route.useParams();
    return <InvoiceDetailScreen invoiceId={invoiceId} />;
  },
});
