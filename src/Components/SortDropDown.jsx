import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SortDropDown() {
  return (
    <Autocomplete
      id="sorting-select-demo"
      sx={{ width: 150 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Sort By"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', 
            },
          }}
        />
      )}
    />
  );
}

const countries = [
  { code: 's1', label: 'Price Low to High' },
  { code: 's2', label: 'Price High to Low'},
  { code: 's3', label: 'Name A to Z' },
  { code: 's3', label: 'Name Z to A' }
];