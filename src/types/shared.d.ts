type DocumentSlug = "terms-and-conditions" | "privacy-policy";

type NavigationLink = {
  slug: ProjectSlug,
  name: ProjectName
};

type NavigationLinks = NavigationLink[];

type ProjectPlatformConfig = {
  name: ProjectPlatformName,
  linkText: string,
  legalLinkText: string
}

type ProjectPlatformsConfig = Record<ProjectPlatformSlug, ProjectPlatformConfig>;

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
  platforms: ProjectPlatformsConfig
}

declare module "data/shared.json" {
  const value: SharedData;
  export default value;
}
