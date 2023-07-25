export type AppStore = {
  store: AppPlatforms;
  href: string;
}

export enum AppPlatforms {
  Apple = 'apple',
  Google = 'google',
  Amazon = 'amazon',
}