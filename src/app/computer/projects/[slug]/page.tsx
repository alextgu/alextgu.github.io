import { notFound } from "next/navigation";
import { projectDesigns } from "../projectDesigns";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const Component = projectDesigns[slug];

  if (!Component) {
    notFound();
  }

  return Component();
}
