type ProjectPlatformName = 'App Store' | 'Google Play' | 'Amazon Appstore';
type ProjectPlatformSlug = 'apple' | 'google' | 'amazon';
type ProjectName = 'Sunny Sudoku' | "Band Rush";
type ProjectSlug = 'sunny-sudoku' | 'band-rush';

type ProjectStoreConfig = {
  name: ProjectPlatformName,
  linkText: string,
  legalLinkText: string
}

type ProjectStore = { href: string, id: string } & Record<DocumentSlug, string>

type ProjectStores = Record<ProjectPlatformSlug, ProjectStore>;

type ProjectData = {
  name: ProjectName,
  subtitle: string,
  description: string,
  briefDescription: string,
  tags: string[],
  icon: string,
  metaImage: string,
  enabled: boolean,
  support: string,
  stores: ProjectStores,
  webGL: boolean,
}

type Projects = Record<ProjectSlug, Project>;

declare module "data/projects.json" {
  const value: Projects;
  export default value;
}