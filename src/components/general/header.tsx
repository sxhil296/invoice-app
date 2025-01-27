import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";

import Container from "./container";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-6 mb-12 sticky top-0">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p className="font-bold text-2xl">
              <Link href="/dashboard">Invoicepedia</Link>
            </p>
            <span className="text-slate-300 text-2xl">/</span>
            <SignedIn>
              <span className="-ml-2">
                <OrganizationSwitcher
                  // hidePersonal
                  afterCreateOrganizationUrl="/dashboard"
                  afterLeaveOrganizationUrl="/"
                />
              </span>
            </SignedIn>
          </div>
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
