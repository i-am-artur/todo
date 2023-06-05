import { ListItemIcon, ListItemText, MenuItem, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { routes } from 'common/routes';
import { Link } from 'react-router-dom';

export default function Login(props: { onClick?: () => void }) {
  return (
    <MenuItem
      onClick={() => {
        props.onClick && props.onClick();
      }}
    >
      <Link to={routes.login}>
        <Stack direction='row' alignItems='center'>
          <ListItemIcon>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </ListItemIcon>
          <ListItemText>Login / Register</ListItemText>
        </Stack>
      </Link>
    </MenuItem>
  );
}
