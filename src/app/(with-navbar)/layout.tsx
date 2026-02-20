import { Navbar } from "@/components/custom/Navbar";
import { SocialLinks } from "@/components/custom/SocialLinks";

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <Navbar />
        <SocialLinks />
      </header>
      <div className="pt-16">{children}</div>
    </>
  );
}
