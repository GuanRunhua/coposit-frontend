import { HttpError, useList, useOne, useQuery, useTable } from '@pankod/refine-core';
import { ITopartists } from './interfaces/top-aritists.interface';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useDataGrid,
} from '@pankod/refine-mui';
import { GetTopArtists } from './services/get-top-artists.api';
import AlarmIcon from '@mui/icons-material/Alarm';
import { useState, createContext } from 'react';
import { CountryAutoComplete } from './components/CountryAutoComplete';
import { proxy, useSnapshot } from 'valtio';

export const artistsQueryState = proxy({ country: 'Australia' });
export const ArtistsList = () => {
  //   const { data, isLoading, isError } = useList<ITopartists, HttpError>({
  //     resource: 'last-fm/artists',

  //  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const snap = useSnapshot(artistsQueryState);
  const { isLoading, isError, data, error } = useQuery<ITopartists>({
    queryKey: ['artists', page, rowsPerPage, snap.country],
    queryFn: () => GetTopArtists(snap.country, page + 1, rowsPerPage),
  });
  console.log(data);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <CountryAutoComplete />
      <List contentProps={{ sx: { width: '100%', maxWidth: 360, bgcolor: 'background.paper' } }}>
        {data?.artist?.map((row) => (
          <>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt='Travis Howard' src={row.image.find((x) => x.size === 'medium')?.['#text']} />
              </ListItemAvatar>
              <ListItemText primary='Photos' secondary='Jan 9, 2014' />
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
};
