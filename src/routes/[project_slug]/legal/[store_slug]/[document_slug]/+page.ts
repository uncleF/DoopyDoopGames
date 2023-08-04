import type { LoadEvent } from "@sveltejs/kit"
import projects from 'data/projects.json'; 

export async function load({ params }: LoadEvent) {
  const { project_slug, store_slug, document_slug } = params;
  if (!project_slug || !store_slug || !document_slug) {
    throw new Error("No slug provided");
  }
  const project = projects[project_slug];
  if (!project || !project.stores[store_slug] || !project.stores[store_slug][document_slug]) {
    return null;
  }
  return {
    name: project.name,
    text: project.stores[store_slug][document_slug],
    document: document_slug == 'privacy-policy' ? "Privacy Policy" : "Terms and Conditions"
  };
}