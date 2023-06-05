import { orange } from '@mui/material/colors';
import { CSSProperties } from 'react';
import { color } from 'styles/colors';

export const theme = {
  gap: {
    column: orange[500],
  },
  spacing: 2,
  palette: {
    mode: 'dark',
    primary: {
      main: color.primary.main,
      contrastText: color.primary.text,
    },
    secondary: {
      main: color.secondary.main,
      contrastText: color.secondary.text,
    },
    error: {
      main: color.error.main,
    },
    neutral: {
      main: color.neutral.main,
    },
  },
  typography: {
    logo: {
      fontSize: 22,
      lineHeight: 'initial',
    },
    pageHeading: {
      fontSize: 20,
    },
    generalHeading: {
      fontSize: 20,
    },
    todoListTitle: {
      fontSize: 18,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          logo: 'h2',
          pageHeading: 'h1',
          generalHeading: 'h2',
          todoListTitle: 'h2',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: color.error.main,
          '&$error': {
            color: color.error.main,
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 450,
      lg: 1024,
      xl: 1200,
    },
  },
};

declare module '@mui/material' {
  interface Color {
    neutral: string;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    gap: {
      column: string;
    };
  }
  interface ThemeOptions {
    gap?: {
      column?: string;
    };
  }
  interface Palette {
    neutral?: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }

  interface TypographyVariants {
    logo: CSSProperties;
    pageHeading: CSSProperties;
    generalHeading: CSSProperties;
    todoListTitle: CSSProperties;
  }

  interface TypographyVariantsOptions {
    logo: CSSProperties;
    pageHeading: CSSProperties;
    generalHeading: CSSProperties;
    todoListTitle: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    logo: true;
    pageHeading: true;
    generalHeading: true;
    todoListTitle: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
