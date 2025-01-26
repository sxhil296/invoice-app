import { db } from "@/db";
import { Invoices } from "@/db/schema";
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
import { cn } from "@/lib/utils";
import Container from "@/components/general/container";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return;
  const results = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.userId, userId));
  console.log("RESULTS", results);

  return (
    <main className="h-full">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">Invoices</h1>
          <p>
            <Button variant={"ghost"} className="inline-flex gap-2" asChild>
              <Link href="/invoices/new">
                Create Invoice
                <CirclePlus className="h-4 w-4" />
              </Link>
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
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="text-left p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold p-4 block  "
                  >
                    {new Date(result?.createTs).toLocaleDateString()}
                  </Link>
                </TableCell>
                <TableCell className="text-left  p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold p-4 block"
                  >
                    John Doe
                  </Link>
                </TableCell>
                <TableCell className="text-left p-0">
                  <Link href={`/invoices/${result.id}`} className="p-4 block">
                    john@example.com
                  </Link>
                </TableCell>
                <TableCell className="text-center p-0">
                  <Link href={`/invoices/${result.id}`} className="p-4 block">
                    <Badge
                      className={cn(
                        "rounded-full capitalize",
                        result?.status === "open" && "bg-blue-500",
                        result?.status === "paid" && "bg-green-500",
                        result?.status === "void" && "bg-zinc-500",
                        result?.status === "uncollectible" && "bg-red-500"
                      )}
                    >
                      {result?.status}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold p-4 block  "
                  >
                    ${(result?.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
