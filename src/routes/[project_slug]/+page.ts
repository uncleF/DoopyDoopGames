import type { LoadEvent } from "@sveltejs/kit";
import { requestProjectPage } from 'utilities/api';
import { generateEnabledProjectEntries } from 'utilities/helpers';

export function entries() {
  return generateEnabledProjectEntries();
}

export async function load({ params }: LoadEvent<{ project_slug: ProjectSlug }>) {
  const { project_slug: slug } = params;
  if (!slug) {
    throw new Error("No slug provided");
  }
  const projectPageData = await requestProjectPage(slug);
  return projectPageData;
}
