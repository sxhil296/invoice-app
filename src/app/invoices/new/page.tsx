"use client";
// import { sql } from "drizzle-orm";
// import { db } from "@/db";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formAction } from "@/app/actions";
import { SyntheticEvent, useState } from "react";
import Form from "next/form";
import SubmitButton from "@/components/general/submitButton";
import Container from "@/components/general/container";
// import { startTransition } from "react";

export default function NewInvoicePage() {
  // const results = await db.execute(sql`SELECT current_database()`);
  // console.log("RESULTS", results);
  const [state, setState] = useState("ready");

  async function handleOnSubmit(e: SyntheticEvent) {
    if (state === "pending") {
      e.preventDefault();
      return;
    }
    setState("pending");

    // const target = e.target as HTMLFormElement;
    // startTransition(async () => {
    //   const formData = new FormData(target);
    //   await formAction(formData);
    //   console.log("FORM DATA", formData);
    // });
  }

  return (
    <main className="h-full">
      <Container>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-semibold">Create Invoice</h1>
      </div>

      <Form
        className="grid gap-4 max-w-xs"
        action={formAction}
        onSubmit={handleOnSubmit}
      >
        <div>
          <Label className="font-semibold block text-sm mb-2" htmlFor="name">
            Billing Name
          </Label>
          <Input name="name" id="name" type="text" required />
        </div>
        <div>
          <Label className="font-semibold block text-sm mb-2" htmlFor="email">
            Billing Email
          </Label>
          <Input name="email" id="email" type="email" required />
        </div>
        <div>
          <Label className="font-semibold block text-sm mb-2" htmlFor="value">
            Value
          </Label>
          <Input name="value" id="value" type="text" required />
        </div>
        <div>
          <Label
            className="font-semibold block text-sm mb-2"
            htmlFor="description"
          >
            Description
          </Label>
          <Textarea name="description" id="description" required />
        </div>

        {/* <Button className="w-full font-semibold">Submit</Button> */}
        <SubmitButton />
      </Form>
      </Container>
     
    </main>
  );
}
