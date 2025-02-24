import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SortDropDown({ setSortType, setSortOrder }) {
  return (
    <Autocomplete
      id="sorting-select-demo"
      sx={{ width: 150 }}
      options={sortTypes}
      autoHighlight
      onChange={(event, selectedItem) => {
        console.log(selectedItem)
        if (selectedItem) {
          setSortType(selectedItem.value)
          setSortOrder(selectedItem.order)
        }
        else{
          setSortType("name")
          setSortOrder("asc")
        }
      }}
      getOptionLabel={(option) =>
        option.label
      }

      renderInput={(params) => (
        <TextField
          {...params}
          label="Sort By"
        />
      )}
    />
  );
}

const sortTypes = [
  { code: 's1', label: 'Price Low to High', value: "price", order: "asc" },
  { code: 's2', label: 'Price High to Low', value: "price", order: "desc" },
  { code: 's3', label: 'Name A to Z', value: "name", order: "asc" },
  { code: 's3', label: 'Name Z to A', value: "name", order: "desc" }
];