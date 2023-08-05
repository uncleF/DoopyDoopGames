import projects from 'data/projects.json';
import { iterateEntries } from 'utilities/iteration';

export async function load() {
  const projectsAndLinks = iterateEntries(projects).reduce(reduceProjectsAndLinks, { projects: {}, links: [] })
  return {  ...projectsAndLinks };
}

function reduceProjectsAndLinks(projectsAndLinks: { projects: Partial<Projects>, links: NavigationLinks }, [ slug, project ]: [ ProjectSlug, Project ]): { projects: Partial<Projects>, links: NavigationLinks } {
  const { name, enabled } = project;
  if (enabled) {
    projectsAndLinks.links.push({ slug, name: name });
    projectsAndLinks.projects[slug] = project;
  }
  return projectsAndLinks;
}