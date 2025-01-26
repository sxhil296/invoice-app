import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { STATUS_OPTIONS } from "@/data/invoices";
import { Invoices } from "@/db/schema";

interface ChangeStatusProps {
  invoice: typeof Invoices.$inferSelect;
  action: (formData: FormData) => Promise<void>;
}

export default function ChangeStatus({ invoice, action }: ChangeStatusProps) {
  return (
    <>
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
              <form action={action}>
                <input type="hidden" name="id" value={invoice.id} />
                <input type="hidden" name="status" value={status.id} />
                <button> {status.name}</button>
              </form>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
