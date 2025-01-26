"use client";
import Container from "@/components/general/container";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { updateInvoiceStatus } from "@/app/actions";
import { Customers, Invoices } from "@/db/schema";
import { useOptimistic } from "react";
import MoreOptions from "./deleteInvoice";
import ChangeStatus from "./changeStatus";

interface InvoiceProps {
  invoice: typeof Invoices.$inferSelect & {
    customer: typeof Customers.$inferSelect;
  };
}

export default function Invoice({ invoice }: InvoiceProps) {
  const [currentStatus, setCurrenStatus] = useOptimistic(
    invoice?.status,
    (status, newStatus) => {
      return String(newStatus);
    }
  );

  async function handleOnUpdateStatus(formData: FormData) {
    const originalStatus = currentStatus;
    setCurrenStatus(formData.get("status") as string);
    try {
      await updateInvoiceStatus(formData);
    } catch (error) {
      setCurrenStatus(originalStatus);
    }
  }

  return (
    <main className="h-full w-full">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-2  md:gap-4">
            Invoice #{invoice.id}{" "}
            <Badge
              className={cn(
                "rounded-full capitalize",
                currentStatus === "open" && "bg-blue-500",
                currentStatus === "paid" && "bg-green-500",
                currentStatus === "void" && "bg-zinc-500",
                currentStatus === "uncollectible" && "bg-red-500"
              )}
            >
              {currentStatus}
            </Badge>
          </h1>

          <div className="flex justify-center items-center gap-2">
            <ChangeStatus action={handleOnUpdateStatus} invoice={invoice} />
            <MoreOptions invoiceId={invoice.id} />
          </div>
        </div>

        <p className="text-3xl mb-3"> ${(invoice?.value / 100).toFixed(2)}</p>
        <p className="text-lg mb-8">{invoice?.description}</p>
        <h2 className="font-bold text-lg mb-4">Billing Details</h2>
        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span> {new Date(invoice?.createTs).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <span>{invoice?.customer?.name}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <span>{invoice?.customer?.email}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
