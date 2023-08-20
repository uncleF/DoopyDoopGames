type IndexPageData = {
  title: string,
  links: NavigationLinks,
  projects: Partial<Projects>,
  support: string,
  meta: MetaData,
}

type ProjectPageData = {
  slug: ProjectSlug,
  project: ProjectData,
  meta: MetaData,
}

type PlayPageData = {
  slug: ProjectSlug,
  project: ProjectData,
  meta: MetaData,
}

type SupportPageData = {
  slug: ProjectSlug,
  name: ProjectName,
  text: string,
  meta: MetaData,
}

type LegalPageData = {
  slug: DocumentSlug,
  name: ProjectName,
  text: string,
  meta: MetaData,
}
