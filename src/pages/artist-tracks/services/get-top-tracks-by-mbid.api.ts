import { baseAPIUrl } from '../../../commons/configs/api.config';

async function GetTopTrackByMbid(mbid: string, page = 1, pageSize = 5) {
  //   const params = new URLSearchParams({
  //     page: page.toString(),
  //     pageSize: pageSize.toString(),
  //   });
  const response = await fetch(`${baseAPIUrl}/last-fm/artists/${mbid}/topTracks?page=${page}&pageSize=${pageSize}`);
  return response.json();
}

export { GetTopTrackByMbid };
