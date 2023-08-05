type IndexPageData = { links: NavigationLinks, projects: Projects }

type ProjectPageData = { slug: ProjectSlug, project: ProjectData }

type SupportPageData = { name: ProjectName, text: string }

type LegalPageData = { slug: DocumentSlug, name: ProjectName, text: string }

type PlayPageData = { name: ProjectName, playURL: string }