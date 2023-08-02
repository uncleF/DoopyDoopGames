import type { LoadEvent } from "@sveltejs/kit"
import sunnySudoku from 'data/projects/sunny-sudoku.json'

export async function load({ params }: LoadEvent) {
  const { project_slug } = params;
  if (!project_slug) {
    throw new Error("No slug provided");
  }
  let project: Project | null = null;
  if (project_slug == sunnySudoku.slug) {
    project = sunnySudoku;
  }
  if (!project || !project.support) {
    return null;
  }
  return {
    name: project.name,
    text : project.support,
  };
}
