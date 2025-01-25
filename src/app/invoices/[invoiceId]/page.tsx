import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const invoiceId = parseInt((await params).invoiceId);

  const [result] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  console.log("result", result);

  return (
    <main className="max-w-5xl mx-auto  h-full  my-12">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-semibold flex items-center gap-4">
          Invoice #{invoiceId}{" "}
          <Badge className="rounded-full">{result?.status}</Badge>
        </h1>
        <p></p>
      </div>

      <p className="text-3xl mb-3"> ${(result?.value / 100).toFixed(2)}</p>
      <p className="text-lg mb-8">{result?.description}</p>
      <h2 className="font-bold text-lg mb-4">Billing Details</h2>
      <ul className="grid gap-2">
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Invoice ID
          </strong>
          <span>{invoiceId}</span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Invoice Date
          </strong>
          <span> {new Date(result?.createTs).toLocaleDateString()}</span>
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
    </main>
  );
}
