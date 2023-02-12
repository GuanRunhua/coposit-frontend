import { Refine } from '@pankod/refine-core';
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  Layout,
  ThemeProvider,
  LightTheme,
  ReadyPage,
  ErrorComponent,
  Header,
} from '@pankod/refine-mui';

import dataProvider from '@pankod/refine-simple-rest';
import routerProvider from '@pankod/refine-react-router-v6';
import { ArtistsList } from './pages/artists/list';
import { ArtistTracks } from './pages/artist-tracks/list';
function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider('http://localhost:4000/api')}
          notificationProvider={notificationProvider}
          Layout={Layout}
          Header={Header}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                element: <ArtistTracks />,
                path: '/artists/:id/topTracks',
                layout: true,
              },
            ] as typeof routerProvider.routes,
          }}
          resources={[
            {
              name: 'artists',
              list: ArtistsList,
            },
          ]}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
