"use client";
import Container from "@/components/general/container";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { STATUS_OPTIONS } from "@/data/invoices";
import { updateInvoiceStatus } from "@/app/actions";
import { ChevronDown } from "lucide-react";
import { Invoices } from "@/db/schema";
import { useOptimistic } from "react";

interface InvoiceProps {
  invoice: typeof Invoices.$inferSelect;
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} className="flex items-center gap-2">
                Change Status
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {STATUS_OPTIONS.map((status) => (
                <DropdownMenuItem key={status.id}>
                  <form action={handleOnUpdateStatus}>
                    <input type="hidden" name="id" value={invoice.id} />
                    <input type="hidden" name="status" value={status.id} />
                    <button> {status.name}</button>
                  </form>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
            <span></span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <span></span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
