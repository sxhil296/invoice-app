import { Ellipsis, Trash } from "lucide-react";
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
            {/* <DropdownMenuItem>
                    <form action={deleteInvoiceAction}>
                      <input type="hidden" name="id" value={invoice.id} />
                      <button className="flex items-center justify-start gap-2 text-sm">
                        <IndianRupee className="h-4 w-4" />
                        Add Payment
                      </button>
                    </form>
                  </DropdownMenuItem> */}
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <button className="flex items-center justify-start gap-2 text-sm">
                  <Trash className="h-4 w-4" />
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
