import type { LoadEvent } from "@sveltejs/kit"
import { requestPlayPage } from "utilities/api";
import { generateWebGLAvailableProjectEntries } from "utilities/helpers";

export function entries() {
  return generateWebGLAvailableProjectEntries();  
}

export async function load({ params }: LoadEvent<{ project_slug: ProjectSlug }>) {
  const { project_slug: slug } = params;
  if (!slug) {
    throw new Error("No slug provided");
  }
  const playPageData = await requestPlayPage(slug);
  return playPageData;
}