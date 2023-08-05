import type { LoadEvent } from "@sveltejs/kit";
import shared from 'data/shared.json';
import projects from 'data/projects.json'; 

export async function load({ params }: LoadEvent<{ project_slug: ProjectSlug, store_slug: ProjectPlatformSlug, document_slug: DocumentSlug }>) {
  const { project_slug, store_slug, document_slug } = params;
  if (!project_slug || !store_slug || !document_slug) {
    throw new Error("No slug provided");
  }
  const project = projects[project_slug];
  if (!project || !project.stores[store_slug] || !project.stores[store_slug][document_slug]) {
    throw new Error("Project or document not found.");
  }
  const { name, stores } = project;
  const document = shared.legal[document_slug];
  const text = stores[store_slug][document_slug];
  return {
    name,
    document,
    text,
  };
}