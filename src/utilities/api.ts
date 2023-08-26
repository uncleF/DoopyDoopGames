import shared from 'data/shared.json';
import projects from 'data/projects.json';
import { processEmail, generateProjectsAndLinks, generateIndexPageMetaData, generateProjectPageMetaData, generatePlayPageMetaData, generateLegalPageMetaData, generateSupportPageMetaData } from 'utilities/helpers';

export function requestIndexPage(): Promise<IndexPageData> {
  const indexPageData = {
    ...generateProjectsAndLinks(projects),
    title: shared.title,
    about: shared.description,
    support: processEmail(shared.support, shared.email, shared.supportSubject),
    social: shared.social,
    email: shared.email,
    meta: generateIndexPageMetaData(projects, shared),
    utm: shared.utm.index,
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
    utm: shared.utm.project,
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
    utm: shared.utm.play,
  };
  return Promise.resolve(playPageData);
}

export function requestLegalPage(projectSlug: ProjectSlug, platformSlug: ProjectPlatformSlug, documentSlug: DocumentSlug): Promise<LegalPageData> {
  const project = projects[projectSlug];
  if (!project|| !project.platforms || !project.platforms[platformSlug] || !project.platforms[platformSlug][documentSlug]) {
    throw new Error("Project or document not found");
  }
  const { name, platforms } = project;
  const text = platforms[platformSlug][documentSlug];
  const legalPageData = {
    slug: documentSlug,
    name,
    text: processEmail(text, shared.email),
    meta: generateLegalPageMetaData(projectSlug, platformSlug, documentSlug, project, shared),
  };
  return Promise.resolve(legalPageData);
}

export function requestSupportPage(slug: ProjectSlug): Promise<SupportPageData> {
  const project = projects[slug];
  if (!project) {
    throw new Error("Project not found.");
  }
  const { name, support } = project;
  const supportPageData = {
    slug,
    name,
    text: processEmail(support, shared.email, shared.supportProjectSubject, name),
    social: shared.social,
    email: shared.email,
    meta: generateSupportPageMetaData(slug, project, shared),
  };
  return Promise.resolve(supportPageData);
}


