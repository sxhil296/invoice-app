import Container from "@/components/general/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen text-center gap-6">
      <Container>
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
