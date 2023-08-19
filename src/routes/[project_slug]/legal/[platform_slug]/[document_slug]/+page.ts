import type { LoadEvent } from "@sveltejs/kit";
import shared from 'data/shared.json';
import projects from 'data/projects.json'; 

export async function load({ params }: LoadEvent<{ project_slug: ProjectSlug, platform_slug: ProjectPlatformSlug, document_slug: DocumentSlug }>) {
  const { project_slug, platform_slug, document_slug } = params;
  if (!project_slug || !platform_slug || !document_slug) {
    throw new Error("No slug provided");
  }
  const project = projects[project_slug];
  if (!project || !project.stores[platform_slug] || !project.stores[platform_slug][document_slug]) {
    throw new Error("Project or document not found.");
  }
  const { name, stores } = project;
  const text = stores[platform_slug][document_slug];
  const url = `${shared.url}/${project_slug}/legal/${platform_slug}/${document_slug}`;
  return {
    name,
    slug: document_slug,
    text,
    url,
  };
}