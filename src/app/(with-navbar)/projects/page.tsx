import { AnimatedWords } from "@/components/custom/AnimatedWords";
import content from "@/data/content.json";

export default function ProjectsPage() {
  const portals = (content as any).portals ?? {};
  const description: string = portals.projects?.description ?? "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-6 md:px-10 pt-8 md:pt-12 pb-24 scroll-smooth">
        <div className="mb-6">
          <h1 className="font-serif font-normal text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground tracking-tight leading-[1.1]">
            <AnimatedWords text="Projects" stagger={0.06} />
          </h1>
          {description && (
            <p className="mt-2 text-base md:text-lg text-neutral-700 dark:text-zinc-300 w-full md:max-w-[50%]">
              {description}
            </p>
          )}
          <div className="mt-4 h-px w-full bg-[color-mix(in_oklab,var(--foreground)_24%,transparent)]" />
        </div>
      </main>
    </div>
  );
}
