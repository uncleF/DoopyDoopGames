// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

  type AppStores = AppStore[];

  type AppStore = {
    store: AppPlatforms;
    href: string;
  }

  enum AppPlatforms {
    Apple = 'apple',
    Google = 'google',
    Amazon = 'amazon',
  }