import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto flex flex-col justify-center items-center min-h-screen text-center gap-6">
      <h1 className="text-5xl font-bold">Invoicepedia</h1>
      <p>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Button asChild>
          <Link href={"/dashboard"}>Sign in</Link>
        </Button>
      </p>
    </main>
  );
}
