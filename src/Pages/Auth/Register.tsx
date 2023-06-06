import { Stack, TextField, Link as MUILink, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { positionCenter } from 'styles/common';
import { container, form, padding } from 'styles/variables';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from 'common/routes';
import { FormEvent, useRef, useState } from 'react';
import { fetchRegister } from 'services/auth';

const noFormErrors: { [key: string]: string | undefined } = {
  email: '',
  password: '',
  passwordDuplicate: '',
};

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const passwordDuplicate = useRef<HTMLInputElement | null>(null);
  const [formError, setFormError] = useState(noFormErrors);
  const [error, setError] = useState('');

  function register(event: FormEvent) {
    event.preventDefault();
    setFormError(noFormErrors);
    setError('');
    setLoading(true);

    fetchRegister(
      email.current?.value ?? '',
      password.current?.value ?? '',
      passwordDuplicate.current?.value ?? '',
    )
      .then(() => {
        navigate(routes.login);
        setLoading(false);
      })
      .catch((err) => {
        const error = err.response.data;
        if (!error.inputValidation) {
          setFormError({
            email: error.email,
            password: error.password,
            passwordDuplicate: error.passwordDuplicate,
          });
        }
        setLoading(false);
      });
  }

  return (
    <Stack component='main' padding={padding.screen}>
      <Typography variant='pageHeading'>Register</Typography>

      <Stack sx={positionCenter} width='100%' maxWidth={400}>
        <form onSubmit={register}>
          <Stack spacing={form.gap.v}>
            <TextField
              inputRef={email}
              error={!!formError.email}
              helperText={formError.email}
              label='Email'
              placeholder='E.g., name@email.com'
              type='email'
              required
            />
            <TextField
              inputRef={password}
              error={!!formError?.password}
              helperText={formError?.password}
              label='Password'
              type='password'
              required
            />
            <TextField
              inputRef={passwordDuplicate}
              error={!!formError.passwordDuplicate}
              helperText={formError.passwordDuplicate}
              label='Repeat password'
              type='password'
              required
            />
          </Stack>

          <Stack spacing={container.gap.v}>
            <Stack component='p' color='error'>
              {error}
            </Stack>
            <LoadingButton
              onClick={register}
              loading={loading}
              sx={{ mt: '60px' }}
              size='large'
              variant='contained'
              color='primary'
            >
              Sumbit
            </LoadingButton>
          </Stack>
        </form>
        <p>
          Already have account?{' '}
          <MUILink component={Link} to={routes.login}>
            Login
          </MUILink>
        </p>
      </Stack>
    </Stack>
  );
}
