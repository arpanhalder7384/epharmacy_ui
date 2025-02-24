import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchMedicinesByName } from '../services/medicineService';
import { ListItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FreeSoloCreateOption() {
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const debounceTimeout = 1500;
  let debounceTimer;

  useEffect(() => {
    if (query.trim() === '') {
      setMedicines([]);
      return;
    }
    setLoading(true);
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {

      fetchMedicinesByName(query)
        .then((res) => {
          console.log(res.data)
          setMedicines(res.data)
        })
        .catch((error) => {
          setMedicines([])
          console.error("Error fetching medicines:", error)
        })
        .finally(() => {
          setLoading(false)
        });
    }, debounceTimeout);

    return () => {
      setLoading(false)
      clearTimeout(debounceTimer);
    }
  }, [query]);


  const handleSelect = (medicineId) => {
    navigate(`/medicineDetails/${medicineId}`)
    setQuery("")
  }

  return (
    <Autocomplete
      value={query}
      onChange={(event, selectedItem) => {
        if (selectedItem) handleSelect(selectedItem.medicineId)
      }}
      onInputChange={(event, newInputValue) => {
        if (newInputValue) {
          setQuery(newInputValue)
        } else {
          setQuery("")
        }
      }
      }
      loading={loading}
      options={medicines}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.medicineName;
      }}
      renderOption={(props, option) => {
        console.log(props, option, "Line 85")
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option.medicineName}
          </li>
        );
      }}
      sx={{ width: 500 }}
      freeSolo={!(medicines.length === 0 && query.length !== 0)} // true means hide
      renderInput={(params) => (
        <TextField {...params} label="Search Medicine" />
      )}
    />
  );
}
