import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Invoice from "@/components/invoice/invoice";
export default async function InvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { userId, orgId } = await auth();
  if (!userId) return;
  const invoiceId = parseInt((await params).invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  let result;
  if (orgId) {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(eq(Invoices.id, invoiceId), eq(Invoices.organizationId, orgId))
      )
      .limit(1);
  } else {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId)
        )
      )
      .limit(1);
  }

  if (!result) {
    notFound();
  }

  const invoice = {
    ...result.invoices,
    customer: result.customers,
  };

  console.log("result", result);

  return <Invoice invoice={invoice} />;
}
