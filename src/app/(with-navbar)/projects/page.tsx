import { AnimatedWords } from "@/components/custom/AnimatedWords";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-4xl pl-4 pr-6 md:pl-6 pt-24 md:pt-28 pb-24 scroll-smooth">
        <div className="mb-6">
          <h1 className="font-serif font-normal text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground tracking-tight leading-[1.1]">
            <AnimatedWords text="Projects" stagger={0.06} />
          </h1>
        </div>
      </main>
    </div>
  );
}
