import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
    palette: {
      background: {
        default: 'white'
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          body {
            padding: 24px;
          }
        `,
      },
    },
});

export default theme;
export {ThemeProvider, CssBaseline};