import { CreditCardIcon, Ellipsis, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { deleteInvoiceAction } from "@/app/actions";
import Link from "next/link";

interface MoreOptionsProps {
  invoiceId: number;
}

export default function MoreOptions({ invoiceId }: MoreOptionsProps) {
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <span className="sr-only">More Options</span>
              <Ellipsis className="h-auto w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                href={`/invoices/${invoiceId}/payment`}
                className="flex items-center justify-start gap-2 text-sm"
              >
                <CreditCardIcon className="h-auto w-4" />
                Payment
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <button className="flex items-center justify-start gap-2 text-sm">
                  <Trash className="h-auto w-4" />
                  Delete Invoice
                </button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              invoice and remove the data from this account.
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <form action={deleteInvoiceAction}>
                <input type="hidden" name="id" value={invoiceId} />

                <Button variant={"destructive"}>Delete Invoice</Button>
              </form>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
