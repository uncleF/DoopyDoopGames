type DataProject = {
  name: ProjectName,
  description: string,
  icon: string,
  enabled: boolean,
  support: string,
  stores: ProjectStores,
  playURL: string,
}

type DataProjects = Record<ProjectSlug, DataProject>;

declare module "data/projects.json" {
  const value: DataProjects;
  export default value;
}