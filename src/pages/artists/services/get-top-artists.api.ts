import { baseAPIUrl } from '../../../commons/configs/api.config';

async function GetTopArtists(country: string, page = 1, pageSize = 5) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    country,
  });
  const response = await fetch(`${baseAPIUrl}/last-fm/artists?${params}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export { GetTopArtists };
