type DocumentSlug = "terms-and-conditions" | "privacy-policy";

type NavigationLink = {
  slug: ProjectSlug,
  name: ProjectName
};

type NavigationLinks = NavigationLink[];

type ProjectStoreConfig = {
  name: ProjectPlatformName,
  linkText: string,
  legalLinkText: string
}

type ProjectStoresConfig = Record<ProjectPlatformSlug, ProjectStoreConfig>;

type SharedData = {
  title: string,
  description: string,
  url: string,
  locale: string,
  metaImage: string,
  metaImageSize: Size,
  legal: Record<DocumentSlug, string>,
  webGLAction: string,
  webGLFrameSize: Size,
  supportTitle: string,
  supportDescription: string,
  support: string,
  stores: ProjectStoresConfig
}

declare module "data/shared.json" {
  const value: SharedData;
  export default value;
}
