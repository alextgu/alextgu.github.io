"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ComputerPage() {
  return (
    <div className="relative h-screen overflow-hidden font-sans bg-zinc-950">
      {/* Zoomed-in screen background */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />

      {/* Screen bezel frame */}
      <div className="fixed inset-4 rounded-xl border border-zinc-700/50 bg-zinc-900/80 backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Screen toolbar */}
        <div className="flex items-center gap-2 border-b border-zinc-700/50 bg-zinc-800/60 px-4 py-2.5">
          <div className="flex gap-1.5">
            <Link href="/?explore=true" className="h-3 w-3 rounded-full bg-red-500/80 block hover:bg-red-400 transition-colors" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-3 font-mono text-xs text-zinc-500">~/computer</span>
        </div>

        {/* Screen content area */}
        <div className="p-8 overflow-y-auto h-[calc(100%-3rem)]">
          <h1 className="font-serif text-2xl text-zinc-100 mb-6">Computer</h1>

          <div className="grid gap-4 max-w-2xl">
            <Card className="bg-zinc-800/50 border-zinc-700/40 text-zinc-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-sans">Project placeholder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-400">
                  Project details will go here. Add entries to content.json to populate this view.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
}
