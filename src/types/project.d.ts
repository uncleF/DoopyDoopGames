type ProjectNames = 'sunnySudoku';
type ProjectSlugs = 'sunny-sudoku';
type ProjectPlatforms = 'apple' | 'google' | 'amazon';

type ProjectStore = {
  href: string;
  privacyPolicy: string;
  termsOfService: string;
}

type ProjectStores = Partial<Record<ProjectPlatforms, ProjectStore>>;

type Project = {
  name: ProjectNames,
  slug: ProjectSlugs,
  support: string,
  stores: ProjectStores
}

declare module "data/projects/sunny-sudoku.json" {
  const value: Project;
  export default value;
}