import Container from "@/components/general/container";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, CreditCardIcon } from "lucide-react";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const invoiceId = parseInt((await params).invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [result] = await db
    .select({
      id: Invoices.id,
      createTs: Invoices.createTs,
      description: Invoices.description,
      value: Invoices.value,
      status: Invoices.status,
      name: Customers.name,
    })
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!result) {
    notFound();
  }

  const invoice = {
    ...result,
    customer: { name: result.name },
  };

  console.log("result", result);

  return (
    <main className="h-full w-full">
      <Container>
        <div className="grid grid-cols-2">
          <div>
            <div className="flex justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-2  md:gap-4">
                Invoice #{invoice.id}{" "}
                <Badge
                  className={cn(
                    "rounded-full capitalize",
                    invoice?.status === "open" && "bg-blue-500",
                    invoice?.status === "paid" && "bg-green-500",
                    invoice?.status === "void" && "bg-zinc-500",
                    invoice?.status === "uncollectible" && "bg-red-500"
                  )}
                >
                  {invoice?.status}
                </Badge>
              </h1>
            </div>

            <p className="text-3xl mb-3">
              ${(invoice?.value / 100).toFixed(2)}
            </p>
            <p className="text-lg mb-8">{invoice?.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Invoice</h2>
            {invoice.status === "open" && (
              <form action="">
                <Button className="inline-flex gap-2 bg-green-700 hover:bg-green-600 font-bold">
                  <CreditCardIcon className="w-5 h-auto" />
                  Pay Invoice
                </Button>
              </form>
            )}
            {invoice.status === "paid" && (
              <p className="text-xl font-bold flex gap-2 items-center">
                <Check className="w-8 h-auto bg-green-500 rounded-full text-white p-1" />
                Invoice Paid
              </p>
            )}
          </div>
        </div>
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
        </ul>
      </Container>
    </main>
  );
}
