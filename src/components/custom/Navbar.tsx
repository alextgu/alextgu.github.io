"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ExternalLink } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Alex', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Hobbies', href: '/hobbies' },
    { name: 'Computer', href: '/computer' },
  ];

  return (
    <nav className="transition-all duration-700">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-1.5">
        
        {/* SECTION 1: Pages (Navigation) */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={isActive ? "/" : item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm transition-all duration-200 flex items-center gap-2",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {isActive && <Home size={14} className="animate-in fade-in zoom-in" />}
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-1">
          <Button variant="ghost" asChild size="sm" className="text-muted-foreground hover:text-foreground">
            <Link href="/linktree" className="gap-2">
              My Content <ExternalLink size={14} />
            </Link>
          </Button>
          <Button variant="secondary" size="sm">
            Contact
          </Button>
        </div>

      </div>
    </nav>
  );
}
export default Navbar;