import type { LoadEvent } from "@sveltejs/kit"
import shared from 'data/shared.json';
import projects from 'data/projects.json';
import { iterateEntries } from 'utilities/iteration';

export function entries() {
  return iterateEntries(projects).reduce(reduceEnabledSlugs, []);
}

function reduceEnabledSlugs(slugs: Record<"project_slug", ProjectSlug>[], [slug, project]: [ ProjectSlug, Project ]) {
    if (project.enabled) {
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
  return {
    slug,
    project,
    url: `${shared.url}/${slug}`
  };
}