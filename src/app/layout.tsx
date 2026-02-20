import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import { Navbar } from "@/components/custom/Navbar";
import { SocialLinks } from "@/components/custom/SocialLinks";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex",
  description: "Personal site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable}`}>
      <body className="antialiased">
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <Navbar />
          <SocialLinks />
        </header>
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
