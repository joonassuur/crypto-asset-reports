import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchAutocomplete } from '../../requests/requests';
import { Token } from '../../utils/types';
import { rootURL } from '../../utils/helpers';
import CircularProgress from '@mui/material/CircularProgress';

export default function SearchInput() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<readonly Token[]>([]);

  useEffect(() => {
    if (inputValue === '') return setOptions([]);
    (async () => {
      setLoading(true);
      const autocompleteResult = await fetchAutocomplete(inputValue);
      setLoading(false);
      if (!autocompleteResult?.suggestions) return;
      const tokensExist = autocompleteResult.suggestions[1]?.tokens;
      if (!tokensExist) return setOptions([]);
      setOptions(autocompleteResult.suggestions[1]?.tokens);
    })();
  }, [inputValue]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      size="small"
      id="token-search-input"
      sx={{
        width: 300,
        '& .MuiInputBase-root': {
          borderRadius: '5px',
          backgroundColor: 'white',
        },
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue: Token | null) => {
        if (!newValue) return;
        navigate(`${rootURL}cryptocurrencies/${newValue.symbol.toUpperCase()}`);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      filterOptions={(x) => x}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          placeholder="Search coin"
          sx={{
            borderRadius: '5px',
            backgroundColor: 'white',
          }}
          InputLabelProps={{ shrink: false }} // Hide label
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
            'aria-label': 'Search coin',
          }}
        />
      )}
    />
  );
}
