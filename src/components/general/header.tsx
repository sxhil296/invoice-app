import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Container from "./container";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-6 mb-12 sticky top-0">
      <Container>
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl">
            <Link href="/dashboard">Invoicepedia</Link>
          </p>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
}
