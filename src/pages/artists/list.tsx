import { useQuery } from '@pankod/refine-core';
import { ITopartists } from './interfaces/top-aritists.interface';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Link,
  List,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@pankod/refine-mui';
import { GetTopArtists } from './services/get-top-artists.api';
import { useState } from 'react';
import { CountryAutoComplete } from './components/CountryAutoComplete';
import { proxy, useSnapshot } from 'valtio';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import numeral from 'numeral';
export const artistsQueryState = proxy({ country: 'Australia' });
export const ArtistsList = () => {
  //   const { data, isLoading, isError } = useList<ITopartists, HttpError>({
  //     resource: 'last-fm/artists',

  //  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const snap = useSnapshot(artistsQueryState);

  const { data } = useQuery<ITopartists>({
    queryKey: ['artists', page, rowsPerPage, snap.country],
    queryFn: () => GetTopArtists(snap.country, page + 1, rowsPerPage),
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <Card>
            <CardHeader title='Filter'> </CardHeader>
            <CardContent>
              <CountryAutoComplete />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={9}>
          <List>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 320 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell align='right'>Name</TableCell>
                    <TableCell align='right'>Listener</TableCell>
                    <TableCell align='right'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.artist?.slice(-5)?.map((row) => (
                    <TableRow key={row.mbid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        <Tooltip title='View Top Tracks'>
                          <Link href={`artists/${row.mbid}/topTracks`} target='_blank'>
                            <Avatar alt={row.name} src={row.image.find((x) => x.size === 'medium')?.['#text']} />
                          </Link>
                        </Tooltip>
                      </TableCell>
                      <TableCell align='right'>{row.name}</TableCell>
                      <TableCell align='right'>{numeral(row.listeners).format('0.0a')}</TableCell>
                      <TableCell align='right'>
                        <Tooltip title='View Top Tracks'>
                          <IconButton color='secondary' aria-label='add an alarm'>
                            <Link href={`artists/${row.mbid}/topTracks`} target='_blank'>
                              <ArtTrackIcon />
                            </Link>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Profilo'>
                          <IconButton color='secondary' aria-label='add an alarm'>
                            <Link href={row.url} target='_blank'>
                              <OpenInNewIcon />
                            </Link>
                          </IconButton>
                        </Tooltip>
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
          </List>
        </Grid>
      </Grid>
    </>
  );
};
