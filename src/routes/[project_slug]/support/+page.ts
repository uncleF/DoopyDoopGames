import type { LoadEvent } from "@sveltejs/kit"
import shared from 'data/shared.json';
import projects from 'data/projects.json'; 

export async function load({ params }: LoadEvent<{ project_slug: ProjectSlug }>) {
  const { project_slug: slug } = params;
  if (!slug) {
    throw new Error("No slug provided");
  }
  const project = projects[slug];
  if (!project) {
    throw new Error("Project not found.");
  }
  const { name, support: text } = project;
  const url = `${shared.url}/${slug}/support`;
  return {
    slug,
    name,
    text,
    url
  };
}