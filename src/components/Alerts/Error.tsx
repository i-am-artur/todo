import { Alert, IconButton, Snackbar, Stack } from '@mui/material';
import { container } from 'styles/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function AlertError(props: {
  show: boolean;
  message: string;
  onClose?: () => void;
}) {
  function handleErrorClose() {
    props.onClose && props.onClose();
  }

  return (
    <Snackbar
      open={props.show}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={6000}
      onClose={handleErrorClose}
    >
      <Alert variant='filled' severity='error' icon={false}>
        <Stack spacing={container.gap.h} direction='row' alignItems='center'>
          <FontAwesomeIcon icon={faCircleExclamation} />
          <p>{props.message}</p>
          <IconButton sx={{ padding: 0 }} onClick={handleErrorClose}>
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
        </Stack>
      </Alert>
    </Snackbar>
  );
}
