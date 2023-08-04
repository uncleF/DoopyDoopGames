type DataSharedStores = Partial<Record<ProjectPlatform, ProjectStoreConfig>>;

type DataShared = {
  support: string,
  stores: DataSharedStores
}

declare module "data/shared.json" {
  const value: DataShared;
  export default value;
}