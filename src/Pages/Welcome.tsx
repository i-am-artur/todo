import { padding } from 'styles/variables';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from 'common/routes';
import { positionCenter } from 'styles/common';

export default function Welcome() {
  return (
    <Stack component='main' p={padding.screen}>
      <Typography variant='pageHeading'>Welcome!</Typography>

      <Stack sx={positionCenter}>
        <Stack component='h2' fontSize={18} fontWeight='bold'>
          Get organized!
        </Stack>
        <Button component={Link} to={routes.login} variant='contained' color='primary'>
          Start
        </Button>
      </Stack>
    </Stack>
  );
}
