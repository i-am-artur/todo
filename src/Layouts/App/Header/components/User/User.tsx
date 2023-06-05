import { Avatar, IconButton, Menu } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useRef, useState } from 'react';
import { font } from 'styles/variables';
import { AuthContext } from 'components/Router/Router';
import Login from 'Layouts/App/Header/components/User/components/Login';
import Logout from 'Layouts/App/Header/components/User/components/Logout';

export default function User() {
  const avatarRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const auth = useContext(AuthContext);

  const handleClose = () => {
    setTimeout(() => setOpenMenu(false), 400);
  };

  return (
    <div>
      <IconButton
        ref={avatarRef}
        aria-controls={openMenu ? 'avatar-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={() => setOpenMenu(true)}
        size='small'
        sx={{ p: 0 }}
      >
        {/*<Avatar alt={fullName} src={auth.user?.image ?? ''}>*/}
        <Avatar alt={'fullName'}>
          <FontAwesomeIcon icon={faUser} fontSize={font.logo.fontSize} />
        </Avatar>
      </IconButton>
      <Menu
        id='avatar-menu'
        anchorEl={avatarRef.current}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        MenuListProps={{
          'aria-labelledby': 'avatar-button',
        }}
      >
        {auth.authenticated ? <Logout onClick={handleClose} /> : <Login onClick={handleClose} />}
      </Menu>
    </div>
  );
}
