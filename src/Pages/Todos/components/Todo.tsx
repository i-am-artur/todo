import { ITodoContent } from 'common/todos';
import {
  Alert,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';
import { container, feature, padding } from 'styles/variables';

export default function Todo(props: {
  value: ITodoContent | null;
  showDelete?: boolean;
  onSave?: (newValue: ITodoContent) => void;
  onDelete?: () => void;
  onClose?: () => void;
  error?: string;
}) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    setTitle(props?.value?.title ?? '');
    setNote(props?.value?.note ?? '');
  }, [props.value]);

  return (
    <Dialog onClose={props.onClose} open={!!props.value} fullScreen={smallScreen}>
      <Stack spacing={container.gap.v} minWidth={300} sx={{ p: padding.screen }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='pageHeading'>Todo</Typography>
          {props?.showDelete && (
            <Button
              onClick={() => props.onDelete && props.onDelete()}
              variant='contained'
              startIcon={<FontAwesomeIcon icon={faTrash} />}
              color='error'
            >
              Delete
            </Button>
          )}
        </Stack>

        <TextField value={title} onChange={(event) => setTitle(event.target.value)} label='Title' />
        <TextField
          value={note}
          onChange={(event) => setNote(event.target.value)}
          label='Note'
          rows={5}
          multiline
        />

        {props.error && (
          <Alert variant='filled' severity='error' icon={false}>
            <Stack spacing={container.gap.h} direction='row' alignItems='center'>
              <FontAwesomeIcon icon={faCircleExclamation} />
              <p>{props.error}</p>
            </Stack>
          </Alert>
        )}

        <Stack spacing={feature.gap.h} direction='row'>
          <Button
            onClick={() => props?.onClose && props?.onClose()}
            fullWidth
            variant='contained'
            color='secondary'
          >
            Back
          </Button>
          <Button
            onClick={() => props?.onSave && props?.onSave({ title, note })}
            fullWidth
            variant='contained'
            color='primary'
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}
