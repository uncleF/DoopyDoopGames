type DocumentSlug = "terms-and-conditions" | "privacy-policy";
type SocialPlatform = "x" | "facebook" | "instagram" | "linkedin" | "github";

type NavigationLink = {
  slug: ProjectSlug,
  name: ProjectName
};

type NavigationLinks = NavigationLink[];

type SocialLink = {
  platform: SocialPlatform,
  href: string
}

type SocialLinks = SocialLink[];

type ProjectPlatformConfig = {
  name: ProjectPlatformName,
  linkText: string,
  legalLinkText: string
}

type ProjectPlatformsConfig = Record<ProjectPlatformSlug, ProjectPlatformConfig>;

type SharedData = {
  title: string,
  description: string,
  promoProject: ProjectSlug,
  url: string,
  email: string,
  locale: string,
  copyrightYear: number,
  metaImage: string,
  metaImageSize: Size,
  webGLAction: string,
  webGLFrameSize: Size,
  legal: Record<DocumentSlug, string>,
  support: string,
  supportTitle: string,
  supportSubject: string,
  supportProjectSubject: string,
  platforms: ProjectPlatformsConfig
  social: SocialLinks,
}

declare module "data/shared.json" {
  const value: SharedData;
  export default value;
}
