import { Outlet } from 'react-router-dom';
import { createContext, useState } from 'react';
import Header from 'Layouts/App/Header/Header';

export const AppContext = createContext(
  {} as {
    search: string;
    setSearch: (value: ((prevState: string) => string) | string) => void;
  },
);

export default function AppLayout() {
  const [search, setSearch] = useState('');

  const appContext = {
    search,
    setSearch,
  };

  return (
    <AppContext.Provider value={appContext}>
      <Header />
      <Outlet />
    </AppContext.Provider>
  );
}
