"use server";

import { Invoices, Status } from "@/db/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function formAction(formData: FormData) {
  const { userId, redirectToSignIn } = await auth();
  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = formData.get("description") as string;

  if (!userId) return redirectToSignIn();

  const results = await db
    .insert(Invoices)
    .values({
      value,
      description,
      userId,
      status: "open",
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
