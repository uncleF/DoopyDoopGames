import type { LoadEvent } from "@sveltejs/kit"
import projects from 'data/projects.json';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
    return Object.keys(projects).map((project_slug) => ({ project_slug }));
}

export async function load({ params }: LoadEvent) {
  const { project_slug: slug } = params;
  if (!slug) {
    throw new Error("No slug provided");
  }
  if (!projects[slug]) {
    throw new Error("Project not found.");
  }
  return {
    slug,
  };
}