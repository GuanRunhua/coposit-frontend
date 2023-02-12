import { HttpError, useList, useNavigation, useOne, useQuery, useTable } from '@pankod/refine-core';
import { ITopartists } from './interfaces/top-aritists.interface';
import {
  Avatar,
  Button,
  IconButton,
  Link,
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
  const { push } = useNavigation();
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.artist?.map((row) => (
              <TableRow key={row.mbid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  <Link href={`artists/${row.mbid}/topTracks`} target='_blank'>
                    <Avatar alt='Travis Howard' src={row.image.find((x) => x.size === 'medium')?.['#text']} />
                  </Link>
                </TableCell>
                <TableCell align='right'>{row.name}</TableCell>
                <TableCell align='right'>
                  <IconButton color='secondary' aria-label='add an alarm'>
                    <AlarmIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component='div'
        count={Number(data?.['@attr']?.totalPages)}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
