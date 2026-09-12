import { getAdjacentProjects, getProjectBySlug, PROJECTS } from "@/constant";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkDetailContent from "./WorkDetailContent";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found | Girish Sawant" };
  }

  return {
    title: `${project.title.split("—")[0].trim()} | Girish Sawant`,
    description: project.description,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { next } = getAdjacentProjects(slug);

  return <WorkDetailContent project={project} next={next} />;
}
