import Link from "next/link";

/**
 * Hobbies will be a card game experience (to be added).
 * Original hobbies page removed per design change.
 */
export default function HobbiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
      <p className="text-foreground/80 text-center max-w-md">
        Hobbies (card game) — coming soon.
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
