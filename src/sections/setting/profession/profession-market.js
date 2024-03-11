// MarketSelect.js
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik } from "formik";
import * as Yup from "yup";

const MarketSelect = ({ value, onChange }) => {

  return (
    <Autocomplete
      id="country-select-demo"
      size='small'
      sx={{ margin: "4px", marginTop: "12px", width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label} ({option.code})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          variant='outlined'
          size='small'
          {...params}
          label="Chọn thị trường"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
        />
      )}
      value={countries.find(country => country.label === value)} 
      onChange={(event, newValue) => onChange(newValue)}
    />
  );
}

export default MarketSelect;

const countries = [
  { code: 'JP', label: 'Nhật Bản' },
  { code: 'Kr', label: 'Hàn Quốc' },
  { code: 'AU', label: 'Úc' },
  { code: 'FR', label: 'Pháp' },
  { code: 'CA', label: 'Canada' }
];
