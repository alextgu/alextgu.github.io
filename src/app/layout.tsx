import type { Metadata } from "next";
import { Suspense } from "react";
import { Newsreader, Inter } from "next/font/google";
import { BackToHome } from "@/components/custom/BackToHome";
import { ScrollToTop } from "@/components/custom/ScrollToTop";
import { ToastProvider } from "@/components/custom/ToastMaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
        <TooltipProvider>
          <ToastProvider>
            <Suspense fallback={null}>
            <BackToHome />
          </Suspense>
            <ScrollToTop />
            {children}
          </ToastProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
