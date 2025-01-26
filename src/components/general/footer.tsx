import Container from "./container";

export default function Footer() {
  return (
    <footer className="mt-8 mb-4  bottom-0">
      <Container className="flex justify-between items-center">
        <p className="text-sm">
          Invoicepedia &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
        <p className="text-sm">Created by Sahil with NextJS, Xata & Clerk.</p>
      </Container>
    </footer>
  );
}
