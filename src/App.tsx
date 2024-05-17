import Header from './Components/Header';
import theme, { ThemeProvider, CssBaseline } from './Components/Theme';

const App = () => {

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Header />

    </ThemeProvider>
  )
}

export default App
