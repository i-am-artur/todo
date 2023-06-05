import { useContext, ReactNode, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from 'common/routes';
import { AuthContext } from 'components/Router/Router';

export function NoAuth(props: { children: ReactNode | ReactNode[] }) {
  const auth = useContext(AuthContext);

  if (auth.authenticated) return <Navigate to={routes.todos} replace />;

  return <Fragment>{props.children}</Fragment>;
}
