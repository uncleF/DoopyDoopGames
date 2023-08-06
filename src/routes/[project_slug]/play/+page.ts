import type { LoadEvent } from "@sveltejs/kit"
import projects from 'data/projects.json';
import { iterateEntries } from 'utilities/iteration';

export function entries() {
  return iterateEntries(projects).reduce(reduceAvailableSlugs, []);
}

function reduceAvailableSlugs(slugs: Record<"project_slug", ProjectSlug>[], [slug, project]: [ ProjectSlug, Project ]) {
    if (project.enabled && project.webGL) {
      slugs.push({ project_slug: slug });
    }
    return slugs;
}

export async function load({ params }: LoadEvent<{ project_slug: ProjectSlug }>) {
  const { project_slug: slug } = params;
  if (!slug) {
    throw new Error("No slug provided");
  }
  const project = projects[slug];
  if (!project) {
    throw new Error("Project not found.");
  }
  const { name } = project;
  return {
    slug,
    name,
  };
}