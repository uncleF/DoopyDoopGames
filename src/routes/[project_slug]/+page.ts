import type { LoadEvent } from "@sveltejs/kit"
import sunnySudoku from 'data/projects/sunny-sudoku.json';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
    return [
        { project_slug: sunnySudoku.slug }
    ];
}

export async function load({ params }: LoadEvent) {
  const slug = params.project_slug;
  let project: Project | null = null;
  if (slug == sunnySudoku.slug) {
    project = sunnySudoku;
  }
  return {
    slug: slug,
    name: project?.name ?? 'Project not found',
  }
}