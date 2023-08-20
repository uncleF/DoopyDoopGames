type ProjectPlatformName = 'App Store' | 'Google Play' | 'Amazon Appstore';
type ProjectPlatformSlug = 'apple' | 'google' | 'amazon';
type ProjectName = 'Sunny Sudoku' | "Band Rush";
type ProjectSlug = 'sunny-sudoku' | 'band-rush';

type ProjectPlatform = { href: string, id: string } & Record<DocumentSlug, string>;

type ProjectPlatforms = Record<ProjectPlatformSlug, ProjectPlatform>;

type ProjectWebGL = { available: boolean } & Record<DocumentSlug, string>;

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
  platforms: ProjectPlatforms?,
  webGL: ProjectWebGL?,
};

type Projects = Record<ProjectSlug, ProjectData>;
declare module "data/projects.json" {
  const value: Projects;
  export default value;
};
