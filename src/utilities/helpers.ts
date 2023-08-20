import projects from 'data/projects.json';
import { iterateEntries } from 'utilities/iteration';

export function transformNameToClassNameComponent(name: string): string {
  return name
    .replace(/^./, name[0].toLowerCase())
    .replace(/\s/g, '');
}

export function findFileExtension(filename: string): string | null {
  const extension = filename.split('.').pop();
  if (extension) {
    return extension;
  }
  return null;
}

export function generateImageMIMEType(image: string): string {
  const extension = findFileExtension(image);
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'webp':
      return 'image/webp';
    default:
      return '';
  }
}

export function reduceProjectsAndLinks(projectsAndLinks: { projects: Partial<Projects>, links: NavigationLinks }, [ slug, project ]: [ ProjectSlug, ProjectData ]): { projects: Partial<Projects>, links: NavigationLinks } {
  const { name, enabled } = project;
  if (enabled) {
    projectsAndLinks.links.push({ slug, name: name });
    projectsAndLinks.projects[slug] = project;
  }
  return projectsAndLinks;
}

export function generateProjectsAndLinks(projects: Projects) {
  const projectsAndLinks = iterateEntries(projects).reduce(reduceProjectsAndLinks, { projects: {}, links: [] })
  return projectsAndLinks;
}

function generateProjectURL(shared: SharedData, slug: ProjectSlug): string {
  return `${shared.url}/${slug}`;
}

function generatePlayURL(shared: SharedData, slug: ProjectSlug): string {
  return `${generateProjectURL(shared, slug)}/play`;
}

function generateLegalURL(shared: SharedData, projectSlug: ProjectSlug, platformSlug: ProjectPlatformSlug, documentSlug: DocumentSlug): string {
  return `${generateProjectURL(shared, projectSlug)}/legal/${platformSlug}/${documentSlug}`
}

function generateSupportURL(shared: SharedData, slug: ProjectSlug): string {
  return `${generateProjectURL(shared, slug)}/support`;
}

function generateMetaImageURL(shared: SharedData, metaImage: string): string {
  return `${shared.url}${metaImage}`;
}

function reduceEnabledSlugs(slugs: Record<"project_slug", ProjectSlug>[], [slug, project]: [ ProjectSlug, ProjectData ]) {
    if (project.enabled) {
      slugs.push({ project_slug: slug });
    }
    return slugs;
}

export function generateEnabledProjectEntries() {
  return iterateEntries(projects).reduce(reduceEnabledSlugs, []);
}

function reduceWebGLAvailableSlugs(slugs: Record<"project_slug", ProjectSlug>[], [slug, project]: [ ProjectSlug, ProjectData ]) {
    if (project.enabled && project.webGL?.available) {
      slugs.push({ project_slug: slug });
    }
    return slugs;
}

export function generateWebGLAvailableProjectEntries() {
  return iterateEntries(projects).reduce(reduceWebGLAvailableSlugs, []);
}

export function generateIndexPageMetaData(shared: SharedData): MetaData {
  return {
    title: shared.title,
    description: shared.description,
    url: shared.url,
    locale: shared.locale,
    metaImage: shared.metaImage,
    metaImageType: generateImageMIMEType(shared.metaImage),
    metaImageSize: shared.metaImageSize,
  }
}

export function generateProjectPageMetaData(slug: ProjectSlug, project: ProjectData, shared: SharedData): MetaData {
  const { name, subtitle, briefDescription, tags, metaImage } = project;
  const title = `${name} – ${subtitle}`;
  return {
    title,
    description: briefDescription,
    url: generateProjectURL(shared, slug),
    locale: shared.locale,
    tags,
    metaTitle: name,
    metaImage: generateMetaImageURL(shared, metaImage),
    metaImageType: generateImageMIMEType(shared.metaImage),
    metaImageSize: shared.metaImageSize,
    appleAppId: project.stores?.apple?.id,
  }
}

export function generatePlayPageMetaData(slug: ProjectSlug, project: ProjectData, shared: SharedData): MetaData {
  const { name, briefDescription, tags, metaImage } = project;
  const title = `${shared.webGLAction} ${name}`;
  return {
    title,
    description: briefDescription,
    url: generatePlayURL(shared, slug),
    locale: shared.locale,
    tags,
    metaTitle: name,
    metaImage: generateMetaImageURL(shared, metaImage),
    metaImageType: generateImageMIMEType(shared.metaImage),
    metaImageSize: shared.metaImageSize,
  }
}

export function generateLegalPageMetaData(projectSlug: ProjectSlug, platformSlug: ProjectPlatformSlug, documentSlug: DocumentSlug, project: ProjectData, shared: SharedData): MetaData {
  const { name, briefDescription, tags, metaImage } = project;
  const title = `${shared.legal[documentSlug]} – ${name}`
  return {
    title,
    description: title,
    url: generateLegalURL(shared, projectSlug, platformSlug, documentSlug),
    locale: shared.locale,
    tags,
    metaTitle: name,
    metaDescription: briefDescription,
    metaUrl: generateProjectURL(shared, projectSlug),
    metaImage: generateMetaImageURL(shared, metaImage),
    metaImageType: generateImageMIMEType(shared.metaImage),
    metaImageSize: shared.metaImageSize,
  }
}

export function generateSupportPageMetaData(slug: ProjectSlug, project: ProjectData, shared: SharedData): MetaData {
  const { name, briefDescription, tags, metaImage } = project;
  const title = `${shared.supportTitle} – ${name}`
  return {
    title,
    description: title,
    url: generateSupportURL(shared, slug),
    locale: shared.locale,
    tags,
    metaTitle: name,
    metaDescription: briefDescription,
    metaUrl: generateProjectURL(shared, slug),
    metaImage: generateMetaImageURL(shared, metaImage),
    metaImageType: generateImageMIMEType(shared.metaImage),
    metaImageSize: shared.metaImageSize,
  }
}
