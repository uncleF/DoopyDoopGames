import type { LoadEvent } from "@sveltejs/kit"
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
  return {
    name,
    text,
  };
}