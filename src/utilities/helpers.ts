import projects from 'data/projects.json';

export const iterateEntries = Object.entries as <T>(obj: T) => Array<[keyof T, T[keyof T]]>

export const iterateKeys = Object.keys as <T>(obj: T) => Array<keyof T>

export function transformNameToClassNameComponent(name: string): string {
  return name
    .replace(/^./, name[0].toLowerCase())
    .replace(/\s/g, '');
}

export function checkFullscreen() {
  if (document) {
    return document.documentElement.requestFullscreen;
  }
  return false;
}

export function toggleFullscreen() {
  if (document) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
}

export function checkIOS() {
  if (navigator) {
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
  }
  return false;
}

export function checkAndroid() {
  if (navigator) {
    return navigator.userAgent.match(/Android/i);
  }
  return false;
}

export function generateKeywords(tags: string[] | undefined): string | null {
  if (!tags) {
    return null;
  }
  return tags.join(', ');
}

export function generateCopyrightYears(startYear: number): string {
  const currentYear = new Date().getFullYear();
  if (startYear === currentYear) {
    return `${startYear}`;
  }
  return `${startYear}-${currentYear}`;
}

export function generateUTM(utm: UTM | undefined): string {
  return iterateEntries(utm).map(([key, value]) => `utm_${key}=${value}`).join('&');
}

export function addUTM(url: string, utm: string): string {
  if (url.includes('?')) {
    return `${url}&${utm}`;
  }
  return `${url}?${utm}`;
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

export function findFileExtension(filename: string): string | null {
  const extension = filename.split('.').pop();
  if (extension) {
    return extension;
  }
  return null;
}

export function insertEmailLinks(text: string, emailLink: string): string {
  return text.replace(/{EMAIL}/g, emailLink);
}

export function insertEmailSubject(text: string, subject?: string): string {
  if (!subject) {
    return text.replace(/{SUBJECT}/g, '');
  }
  return text.replace(/{SUBJECT}/g, `?subject=${subject}`);
}

export function insertProjectName(text: string, project?: ProjectName): string {
  if (!project) {
    return text.replace(/{SUBJECT}/g, '');
  }
  return text.replace(/{PROJECT}/g, project);
}

export function processEmail(text: string, email: string, subject?: string, project?: ProjectName): string {
  let processedEmail = `<a href="mailto:${email}{SUBJECT}">${email}</a>`;
  processedEmail = insertEmailSubject(processedEmail, subject);
  processedEmail = insertProjectName(processedEmail, project);
  return insertEmailLinks(text, processedEmail);
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

export function generateIndexPageMetaData(projects: Projects, shared: SharedData): MetaData {
  const { title, description, url, locale, metaImage, metaImageSize } = shared;
  const project = projects[shared.promoProject];
  return {
    title,
    description,
    url,
    locale,
    metaSiteName: shared.title,
    metaImage: generateMetaImageURL(shared, metaImage),
    metaImageType: generateImageMIMEType(metaImage),
    metaImageSize: metaImageSize,
    appleAppId: project.platforms?.apple?.id,
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
    metaSiteName: shared.title,
    metaImage: generateMetaImageURL(shared, metaImage),
    metaImageType: generateImageMIMEType(metaImage),
    metaImageSize: shared.metaImageSize,
    appleAppId: project.platforms?.apple?.id,
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
    metaSiteName: shared.title,
    metaImage: generateMetaImageURL(shared, metaImage),
    metaImageType: generateImageMIMEType(metaImage),
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
    metaSiteName: shared.title,
    metaDescription: briefDescription,
    metaUrl: generateProjectURL(shared, projectSlug),
    metaImage: generateMetaImageURL(shared, metaImage),
    metaImageType: generateImageMIMEType(metaImage),
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
    metaSiteName: shared.title,
    metaDescription: briefDescription,
    metaUrl: generateProjectURL(shared, slug),
    metaImage: generateMetaImageURL(shared, metaImage),
    metaImageType: generateImageMIMEType(metaImage),
    metaImageSize: shared.metaImageSize,
  }
}
