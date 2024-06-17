import BasicSearch from './Components/BasicSearch';
import Header from './Components/Header';
import NewsLetter from './Components/NewsLetter';
import { PopularPosts } from './Components/PopularPosts';
import theme, { ThemeProvider, CssBaseline } from './Components/Theme';

const App = () => {

  return (
    
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Header /> 
      <BasicSearch />
      <PopularPosts />
      <NewsLetter />
    </ThemeProvider>

  )
}

export default App
