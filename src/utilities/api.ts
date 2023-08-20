import shared from 'data/shared.json';
import projects from 'data/projects.json';
import { generateProjectsAndLinks, generateIndexPageMetaData, generateProjectPageMetaData, generatePlayPageMetaData, generateLegalPageMetaData, generateSupportPageMetaData } from 'utilities/helpers';

export function requestIndexPage(): Promise<IndexPageData> {
  const indexPageData = {
    ...generateProjectsAndLinks(projects),
    title: shared.title,
    support: shared.support,
    meta: generateIndexPageMetaData(shared),
  }
  return Promise.resolve(indexPageData);
}

export function requestProjectPage(slug: ProjectSlug): Promise<ProjectPageData> {
  const project = projects[slug];
  if (!project) {
    throw new Error("Project not found");
  }
  const projectPageData = {
    slug,
    project: project,
    meta: generateProjectPageMetaData(slug, project, shared),
  };
  return Promise.resolve(projectPageData);
}

export function requestPlayPage(slug: ProjectSlug): Promise<PlayPageData> {
  const project = projects[slug];
  if (!project) {
    throw new Error("Project not found");
  }
  const playPageData = {
    slug,
    project: project,
    meta: generatePlayPageMetaData(slug, project, shared),
  };
  return Promise.resolve(playPageData);
}

export function requestLegalPage(projectSlug: ProjectSlug, platformSlug: ProjectPlatformSlug, documentSlug: DocumentSlug): Promise<LegalPageData> {
  const project = projects[projectSlug];
  if (!project|| !project.stores || !project.stores[platformSlug] || !project.stores[platformSlug][documentSlug]) {
    throw new Error("Project or document not found");
  }
  const { name, stores } = project;
  const text = stores[platformSlug][documentSlug];
  const legalPageData = {
    slug: documentSlug,
    name,
    text,
    meta: generateLegalPageMetaData(projectSlug, platformSlug, documentSlug, project, shared),
  };
  return Promise.resolve(legalPageData);
}

export function requestSupportPage(slug: ProjectSlug): Promise<SupportPageData> {
  const project = projects[slug];
  if (!project) {
    throw new Error("Project not found.");
  }
  const { name, support: text } = project;
  const supportPageData = {
    slug,
    name,
    text,
    meta: generateSupportPageMetaData(slug, project, shared),
  };
  return Promise.resolve(supportPageData);
}


