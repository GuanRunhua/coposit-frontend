import { useQuery } from '@pankod/refine-core';
import { Autocomplete, TextField, CircularProgress } from '@pankod/refine-mui';

import { useState } from 'react';
import { GetCountries, ICountry } from '../services/get-country.api';

import { artistsQueryState } from '../list';
export const CountryAutoComplete = () => {
  const [open, setOpen] = useState(false);

  const { isLoading, data = [] } = useQuery<ICountry[]>({
    queryKey: ['getCountries'],
    queryFn: () => GetCountries(),
  });
  console.log(data);
  return (
    <Autocomplete
      id='country-autocomplete'
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => {
        console.log(option);
        return option.name || '';
      }}
      options={data}
      loading={isLoading}
      onChange={(e, val) => {
        console.log(val);
        artistsQueryState.country = val?.name || '';
      }}
      defaultValue={{ key: 'AUS', name: 'Australia' }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Country'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
