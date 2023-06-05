import { CircularProgress, Stack } from '@mui/material';
import { positionCenter } from 'styles/common';

export default function Loading() {
  return (
    <Stack sx={positionCenter}>
      <CircularProgress />
    </Stack>
  );
}
