import { ReactNode, useContext, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from 'common/routes';
import { AuthContext } from 'components/Router/Router';

export function PrivateRoute(props: { children: ReactNode | ReactNode[] }) {
  const auth = useContext(AuthContext);
  if (!auth.authenticated) return <Navigate to={routes.login} />;

  return <Fragment>{props.children}</Fragment>;
}
