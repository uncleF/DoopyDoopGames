import type { LoadEvent } from "@sveltejs/kit"
import { requestSupportPage } from "utilities/api";

export async function load({ params }: LoadEvent<{ project_slug: ProjectSlug }>) {
  const { project_slug: slug } = params;
  if (!slug) {
    throw new Error("No slug provided");
  }
  const supportPageData = await requestSupportPage(slug);
  return supportPageData;
}