import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CirclePlus } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="max-w-5xl mx-auto flex flex-col justify-center  h-full  text-center gap-6 my-12">
      <div className="flex justify-between">
      <h1 className="text-3xl font-semibold">Invoices</h1>
      <p>
        <Button variant={'ghost'} className="inline-flex gap-2" asChild>
          <Link href="/invoices/new"> Create Invoice
          <CirclePlus className="h-4 w-4"/></Link>
         
          </Button>
      </p>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="p-4 text-left">
              <span className="font-semibold"> 12/12/2022</span>
            </TableCell>
            <TableCell className="p-4 text-left ">
              <span className="font-semibold"> John Doe</span>
            </TableCell>
            <TableCell className="p-4 text-left">
              <span className=""> john@example.com</span>
            </TableCell>
            <TableCell className="p-4 text-center">
              <Badge className="rounded-full">Open</Badge>
            </TableCell>
            <TableCell className="p-4 text-right">
              <span className="font-semibold"> $250.00</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
