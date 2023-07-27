type ProjectStoreConfig = {
  classSuffix: string,
  linkText: string,
  legalLinkText: string
}

type Config = {
  stores: Record<ProjectPlatforms, ProjectStoreConfig>;
}

declare module "config/config.json" {
  const value: Config;
  export default value;
}