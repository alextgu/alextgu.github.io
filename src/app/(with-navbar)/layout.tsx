import { Navbar } from "@/components/custom/Navbar";
import { SocialLinks } from "@/components/custom/SocialLinks";

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between max-md:justify-center gap-4 px-8 py-5">
        <Navbar />
        <SocialLinks />
      </header>
      <div className="pt-16">{children}</div>
    </>
  );
}
