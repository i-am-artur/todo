import { theme as defaultTheme } from 'styles/MUI/mui-theme';
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { createContext, ReactNode, useMemo, useState } from 'react';
import { ColorMode } from 'common/theme';

export const ColorModeContext = createContext(
  {} as {
    toggleMode: () => void;
    mode: ColorMode;
  },
);

export default function Theme(props: { children: ReactNode | ReactNode[] }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<ColorMode>(prefersDarkMode ? ColorMode.dark : ColorMode.light);

  // @ts-ignore
  const theme = useMemo(
    () => createTheme({ ...defaultTheme, palette: { ...defaultTheme.palette, mode: mode } }),
    [mode],
  );

  function toggleMode() {
    setMode((pre) => (pre === ColorMode.light ? ColorMode.dark : ColorMode.light));
  }

  return (
    <ColorModeContext.Provider value={{ toggleMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
