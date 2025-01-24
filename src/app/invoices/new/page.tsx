import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewInvoicePage() {
  return (
    <main className="max-w-5xl mx-auto flex flex-col justify-center  h-full  gap-6 my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Create Invoice</h1>
      </div>

      <form className="grid gap-4 max-w-xs">
        <div>
          <Label className="font-semibold block text-sm mb-2" htmlFor="name">
            Billing Name
          </Label>
          <Input name="name" id="name" type="text" />
        </div>
        <div>
          <Label className="font-semibold block text-sm mb-2" htmlFor="email">
            Billing Email
          </Label>
          <Input name="email" id="email" type="email" />
        </div>
        <div>
          <Label className="font-semibold block text-sm mb-2" htmlFor="value">
            Value
          </Label>
          <Input name="value" id="value" type="text" />
        </div>
        <div>
          <Label
            className="font-semibold block text-sm mb-2"
            htmlFor="description"
          >
            Description
          </Label>
          <Textarea name="description" id="description" />
        </div>

        <Button className="w-full font-semibold">Submit</Button>
      </form>
    </main>
  );
}
