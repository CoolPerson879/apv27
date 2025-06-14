import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="flex space-x-4">
            <Link href="/help" className="hover:text-primary">
              Help
            </Link>
            <Link href="/additional-resources" className="hover:text-primary">
              Resources
            </Link>
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
          <div className="text-center md:text-right">
            &copy; {new Date().getFullYear()} RajScape AP World History Prep.
            All rights reserved.
          </div>
        </div>
        <p className="text-xs">
          AP® is a trademark registered by the College Board, which is not
          affiliated with, and does not endorse, this website.
        </p>
      </div>
    </footer>
  );
}
