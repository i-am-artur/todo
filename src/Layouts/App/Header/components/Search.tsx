import { InputAdornment, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext, useDeferredValue, useEffect, useState, Fragment } from 'react';
import { AppContext } from 'Layouts/App/AppLayout';
import { AuthContext } from 'components/Router/Router';

export default function Search() {
  const app = useContext(AppContext);
  const auth = useContext(AuthContext);
  const [search, setSearch] = useState(app.search);
  const deferredSearch = useDeferredValue(search);

  function onChange(newValue: string) {
    setSearch(newValue);
  }

  useEffect(() => {
    app.setSearch(deferredSearch);
  }, [deferredSearch]);

  return (
    <Fragment>
      {auth.authenticated && (
        <TextField
          value={app.search}
          onChange={(event) => onChange(event.target.value)}
          fullWidth
          size='small'
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
          placeholder='Search'
          aria-label='Search'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputAdornment>
            ),
          }}
        />
      )}
    </Fragment>
  );
}
