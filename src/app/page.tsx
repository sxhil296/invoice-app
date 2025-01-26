import Container from "@/components/general/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full flex justify-center items-center">
      <Container className="flex justify-center flex-col gap-6 items-center">
        <h1 className="text-5xl font-bold">Invoicepedia</h1>
        <p>
          <Button asChild>
            <Link href={"/dashboard"}>Sign in</Link>
          </Button>
        </p>
      </Container>
    </main>
  );
}
