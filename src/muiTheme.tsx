import { createTheme, ThemeOptions } from '@mui/material/styles';

export const colors = {
  primary: '#007EA7',
  secondary: '#FAE8EB',
  tertiary: '#58667e',
  lightgray: '#fcfdfe',
  lightgray2: '#f8fafd',
  yellow: '#f5b97f',
  green: '#16c784',
  red: '#ea3943',
};

export const themeObject: ThemeOptions = {
  palette: {
    primary: {
      main: colors.primary,
      contrastText: 'white',
    },
    secondary: {
      main: colors.secondary,
      contrastText: 'black',
    },
    success: {
      main: '#16c784',
      contrastText: '#fff',
    },
    warning: {
      main: '#f5b97f',
      contrastText: '#fff',
    },
    error: {
      main: '#ea3943',
      contrastText: '#fff',
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '48px!important',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          fontWeight: 'bold',
          color: colors.primary,
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
        head: {
          color: 'white',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: colors.lightgray2,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.tertiary,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: colors.tertiary,
        },
        h2: {
          color: colors.tertiary,
        },
        h3: {
          color: colors.tertiary,
        },
        h4: {
          color: colors.tertiary,
        },
        h5: {
          color: 'black',
        },
        h6: {
          fontSize: '18px',
          color: colors.tertiary,
        },
      },
    },
  },
};
const theme = createTheme(themeObject);
export default theme;
