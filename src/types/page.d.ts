type IndexPageData = {
  links: NavigationLinks,
  projects: Projects
}

type ProjectPageData = {
  slug: ProjectSlug,
  project: ProjectData,
  url: string,
}

type SupportPageData = {
  slug: ProjectSlug,
  name: ProjectName,
  text: string,
  url: string,
}

type LegalPageData = {
  slug: DocumentSlug,
  name: ProjectName,
  text: string,
  url: string,
}

type PlayPageData = {
  slug: ProjectSlug,
  project: ProjectData,
  url: string,
}