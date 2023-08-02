import type { LoadEvent } from "@sveltejs/kit"
import sunnySudoku from 'data/projects/sunny-sudoku.json'

export async function load({ params }: LoadEvent) {
  const { project_slug, store_slug, document_slug } = params;
  if (!project_slug || !store_slug || !document_slug) {
    throw new Error("No slug provided");
  }
  let project: Project | null = null;
  if (project_slug == sunnySudoku.slug) {
    project = sunnySudoku;
  }
  if (!project || !project.stores[store_slug] || !project.stores[store_slug][document_slug]) {
    return null;
  }
  let legalDocument: string | null = null;
  if (document_slug == 'privacy-policy') {
    legalDocument = "Privacy Policy";
  } else if (document_slug == 'terms-and-conditions') {
    legalDocument = "Terms and Conditions";
  }
  return {
    name: project.name,
    text: project.stores[store_slug][document_slug],
    document: legalDocument
  };
}
