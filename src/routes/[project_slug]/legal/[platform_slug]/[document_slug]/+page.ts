import type { LoadEvent } from "@sveltejs/kit";
import { requestLegalPage } from "utilities/api";

export async function load({ params }: LoadEvent<{ project_slug: ProjectSlug, platform_slug: ProjectPlatformSlug, document_slug: DocumentSlug }>) {
  const { project_slug, platform_slug, document_slug } = params;
  if (!project_slug || !platform_slug || !document_slug) {
    throw new Error("No slug provided");
  }
  const playPageData = await requestLegalPage(project_slug, platform_slug, document_slug);
  return playPageData;
}