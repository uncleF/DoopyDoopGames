import { requestIndexPage } from 'utilities/api';

export async function load() {
  const indexPageData = await requestIndexPage();
  return indexPageData;
}
