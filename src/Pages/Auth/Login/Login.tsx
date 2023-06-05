import { Stack, TextField, Link as MUILink, Typography } from '@mui/material';
import { positionCenter } from 'styles/common';
import { container, form, padding } from 'styles/variables';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from 'common/routes';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from 'components/Router/Router';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchLogin } from 'services/auth';
import { setJWTInLocalStorage } from 'common/jwt';

const noFormErrors: { [key: string]: string | undefined } = {
  email: '',
  password: '',
};

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [formError, setFormError] = useState(noFormErrors);
  const [error, setError] = useState('');

  async function login() {
    setLoading(true);
    fetchLogin(email.current?.value ?? '', password.current?.value ?? '')
      .then((res) => {
        setJWTInLocalStorage(res.data.jwt);
        auth.setAuthenticated(true);
        setLoading(false);
        navigate(routes.todos);
      })
      .catch((err) => {
        const error = err.response?.data;
        if (!error?.inputValidation) {
          setFormError({
            email: error?.email,
            password: error?.password,
          });
        } else {
          console.log(err);
          setError('Error: Try again');
        }
        setLoading(false);
      });
  }

  return (
    <Stack component='main' padding={padding.screen}>
      <Typography variant='pageHeading'>Login</Typography>

      <Stack
        spacing={container.gap.v}
        sx={{ ...positionCenter, p: padding.screen }}
        width='100%'
        maxWidth={400}
      >
        <form>
          <Stack spacing={form.gap.v}>
            <TextField
              inputRef={email}
              error={!!formError.email}
              helperText={formError.email}
              label='Email'
              placeholder='E.g., name@email.com'
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
          </Stack>

          <Stack spacing={container.gap.v}>
            <Stack component='p' color='error'>
              {error}
            </Stack>
            <LoadingButton
              type='submit'
              onSubmit={login}
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
          No account?{' '}
          <MUILink component={Link} to={routes.register}>
            Register
          </MUILink>
        </p>
      </Stack>
    </Stack>
  );
}
