import { ListItemIcon, ListItemText, MenuItem, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { routes } from 'common/routes';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'components/Router/Router';
import { removeJWTFromLocalStorage } from 'common/jwt';

export default function Logout(props: { onClick?: () => void }) {
  const auth = useContext(AuthContext);

  return (
    <MenuItem
      onClick={() => {
        removeJWTFromLocalStorage();
        auth.setAuthenticated(false);
        props.onClick && props.onClick();
      }}
    >
      <Link to={routes.login}>
        <Stack direction='row' alignItems='center'>
          <ListItemIcon>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </Stack>
      </Link>
    </MenuItem>
  );
}
