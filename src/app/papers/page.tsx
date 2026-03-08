import Link from "next/link";

/**
 * Loose papers — different view of the desk (to be added).
 */
export default function PapersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
      <p className="text-foreground/80 text-center max-w-md">
        Loose papers — alternate desk view coming soon.
      </p>
      <Link
        href="/?explore=true"
        className="mt-6 text-sm text-foreground/70 hover:text-foreground underline underline-offset-2"
      >
        Back to desk
      </Link>
    </div>
  );
}
