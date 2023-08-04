type ProjectName = 'Sunny Sudoku' | "Band Rush";
type ProjectSlug = 'sunny-sudoku' | 'band-rush';
type ProjectPlatform = 'apple' | 'google' | 'amazon';

type ProjectStore = {
  href: string;
  "privacy-policy": string;
  "terms-and-conditions": string;
}

type ProjectStoreConfig = {
  classSuffix: string,
  linkText: string,
  legalLinkText: string
}

type ProjectStores = Partial<Record<ProjectPlatform, ProjectStore>>;