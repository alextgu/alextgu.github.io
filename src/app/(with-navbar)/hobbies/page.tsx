import content from "@/data/content.json";
import { AnimatedWords } from "@/components/custom/AnimatedWords";

type CategoryItem = {
  id: string;
  displayType: string;
  title: string;
  items: unknown[];
};

function VideoGalleryBlock({ category }: { category: CategoryItem }) {
  return (
    <section
      id={category.id}
      className="scroll-mt-24 min-h-[50vh] py-16"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">
        {category.title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.length === 0 ? (
          <p className="text-muted-foreground col-span-full">No items yet.</p>
        ) : (
          (category.items as { id?: string; title?: string; url?: string }[]).map((item) => (
            <div
              key={item.id ?? item.title ?? Math.random()}
              className="rounded-lg border border-border bg-card p-4 text-card-foreground"
            >
              {item.title && <p className="font-medium">{item.title}</p>}
              {item.url && (
                <a href={item.url} className="text-sm text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  View
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function StandardListBlock({ category }: { category: CategoryItem }) {
  return (
    <section
      id={category.id}
      className="scroll-mt-24 min-h-[40vh] py-16"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">
        {category.title}
      </h2>
      <ul className="space-y-2">
        {category.items.length === 0 ? (
          <li className="text-muted-foreground">No items yet.</li>
        ) : (
          (category.items as { id?: string; label?: string }[]).map((item) => (
            <li key={item.id ?? item.label ?? Math.random()} className="text-foreground">
              {item.label ?? String(item)}
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

function CategoryFactory({ category }: { category: CategoryItem }) {
  switch (category.displayType) {
    case "VIDEO_GALLERY":
      return <VideoGalleryBlock category={category} />;
    case "STANDARD_LIST":
      return <StandardListBlock category={category} />;
    default:
      return <StandardListBlock category={category} />;
  }
}

export default function HobbiesPage() {
  const hobbies = (content.portals as { hobbies: { path: string; categories: CategoryItem[] } }).hobbies;
  const categories = hobbies.categories;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-4xl pl-4 pr-6 md:pl-6 pt-24 md:pt-28 pb-24 scroll-smooth">
        <div className="mb-6">
          <h1 className="font-serif font-normal text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground tracking-tight leading-[1.1]">
            <AnimatedWords text="Hobbies" stagger={0.06} />
          </h1>
        </div>
        <div className="flex flex-col gap-8">
          {categories.map((category) => (
            <CategoryFactory key={category.id} category={category} />
          ))}
        </div>
      </main>
    </div>
  );
}
