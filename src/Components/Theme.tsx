import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
    typography: {
      fontFamily: 'Roboto, sans-serif'
    },
    palette: {
      background: {
        default: 'white'
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          body {
            padding: 0px;
          }
          @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap) format('woff2');
        }
        `,
      },
    },
});

export default theme;
export {ThemeProvider, CssBaseline};