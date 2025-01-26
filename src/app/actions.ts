"use server";

import { Customers, Invoices, Status } from "@/db/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function formAction(formData: FormData) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = formData.get("description") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const [customer] = await db
    .insert(Customers)
    .values({
      name,
      email,
      userId,
    })
    .returning({
      id: Customers.id,
    });

  const results = await db
    .insert(Invoices)
    .values({
      value,
      description,
      userId,
      status: "open",
      customerId: customer.id,
    })
    .returning({
      id: Invoices.id,
    });

  redirect(`/invoices/${results[0].id}`);

  // console.log("FORMDATA", formData);
}

export async function updateInvoiceStatus(formData: FormData) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  const results = await db
    .update(Invoices)
    .set({ status })
    .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

  revalidatePath(`/invoices/${id}`, "page");
  console.log("RESULTS", results);
}

export async function deleteInvoiceAction(formData: FormData) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  const id = formData.get("id") as string;

  const results = await db
    .delete(Invoices)
    .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

  console.log("RESULTS", results);
  redirect(`/dashboard`);
}
