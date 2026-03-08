import { CornerOverlays } from "@/components/custom/CornerOverlays";

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CornerOverlays />
      <div>{children}</div>
    </>
  );
}
