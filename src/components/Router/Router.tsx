import { createContext, lazy, Suspense, useEffect, useState, Fragment } from 'react';
import { routes } from 'common/routes';
import Loading from 'components/Loading';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from 'Layouts/App/AppLayout';
import { PrivateRoute } from 'components/Router/PrivateRoute';
import { NoAuth } from 'components/Router/NoAuth';
import { fetchVerifyJWT } from 'services/auth';

const Welcome = lazy(() => import('Pages/Welcome'));
const Login = lazy(() => import('Pages/Auth/Login/Login'));
const Register = lazy(() => import('Pages/Auth/Register'));
const Todos = lazy(() => import('Pages/Todos/Todos'));

export const AuthContext = createContext(
  {} as {
    authenticated: boolean;
    setAuthenticated: (value: ((prevState: boolean) => boolean) | boolean) => void;
  },
);

export default function Router() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVerifyJWT()
      .then((res) => {
        setAuthenticated(res.data.verified);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const auth = {
    authenticated,
    setAuthenticated,
  };

  return (
    <Fragment>
      {!loading && (
        <Suspense fallback={<Loading />}>
          <AuthContext.Provider value={auth}>
            <Routes>
              <Route path='' element={<AppLayout />}>
                <Route
                  path=''
                  element={authenticated ? <Navigate to={routes.todos} replace /> : <Welcome />}
                />
                <Route
                  path={routes.todos}
                  element={
                    <PrivateRoute>
                      <Todos />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={routes.login}
                  element={
                    <NoAuth>
                      <Login />
                    </NoAuth>
                  }
                />
                <Route
                  path={routes.register}
                  element={
                    <NoAuth>
                      <Register />
                    </NoAuth>
                  }
                />
              </Route>
            </Routes>
          </AuthContext.Provider>
        </Suspense>
      )}
    </Fragment>
  );
}
