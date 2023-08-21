type DocumentSlug = "terms-and-conditions" | "privacy-policy";
type SocialPlatform = "x" | "facebook" | "instagram" | "linkedin" | "github";

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

type SocialLink = {
  platform: SocialPlatform,
  href: string
}

type SocialLinks = SocialLink[];

type SharedData = {
  title: string,
  description: string,
  url: string,
  email: string,
  locale: string,
  metaImage: string,
  metaImageSize: Size,
  promoProject: ProjectSlug,
  legal: Record<DocumentSlug, string>,
  webGLAction: string,
  webGLFrameSize: Size,
  support: string,
  supportTitle: string,
  supportDescription: string,
  supportSubject: string,
  supportProjectSubject: string,
  platforms: ProjectPlatformsConfig
  social: SocialLinks,
}

declare module "data/shared.json" {
  const value: SharedData;
  export default value;
}
