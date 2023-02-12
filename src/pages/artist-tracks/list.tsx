import { useQuery } from '@pankod/refine-core';
import { useLocation, useParams } from '@pankod/refine-react-router-v6';
import { ITopTracks } from './interfaces/top-tracks.interface';
import { GetTopTrackByMbid } from './services/get-top-tracks-by-mbid.api';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Pagination, Typography } from '@pankod/refine-mui';
import { useState } from 'react';

export const ArtistTracks = () => {
  // const [artist, setArtist] = useState("");
  const param = useParams();
  const id = param.id;
  const [page, setPage] = useState(0);
  const { isLoading, isError, data, error } = useQuery<ITopTracks>({
    queryKey: ['topTracks', id, page],
    queryFn: () => GetTopTrackByMbid(id || '', page + 1),
  });

  const artist = data?.track?.[0]?.artist.name;
  console.log(page);
  return (
    <>
      <List
        headerProps={{ title: 'Top Tracks - ' + artist }}
        contentProps={{ sx: { width: '100%', maxWidth: 420, bgcolor: 'background.paper' } }}
      >
        {data?.track?.slice(-5)?.map((row) => (
          <ListItem key={row.name + row.playcount}>
            <ListItemAvatar>
              <Avatar alt={row.name} src={row.image.find((x) => x.size === 'medium')?.['#text']} />
            </ListItemAvatar>
            <ListItemText
              primary={row.name}
              secondary={
                <>
                  <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                    {`Rank ${row['@attr'].rank || '-'}`}
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </>
              }
            />
          </ListItem>
        ))}
        <Pagination
          onChange={(e, page) => {
            setPage(page);
          }}
          count={Number(data?.['@attr'].totalPages || 0)}
          color='primary'
        />
      </List>
    </>
  );
};
