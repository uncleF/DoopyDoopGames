type Size = {
  width: integer,
  height: integer
};

type DocumentSlug = "terms-and-conditions" | "privacy-policy";

type NavigationLink = {
  slug: ProjectSlug,
  name: ProjectName
};

type NavigationLinks = NavigationLink[];

type SharedStores = Record<ProjectPlatformSlug, ProjectStoreConfig>;

type SharedData = {
  title: string,
  description: string,
  url: string,
  locale: string,
  metaImage: string,
  metaImageSize: Size,
  legal: Record<DocumentSlug, string>,
  playTitle: string,
  playFrameSize: Size,
  supportTitle: string,
  support: string,
  stores: SharedStores
}

declare module "data/shared.json" {
  const value: SharedData;
  export default value;
}