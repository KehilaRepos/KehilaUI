import BasicSearch from './Components/BasicSearch';
import Footer from './Components/Footer';
import Header from './Components/Header';
import HomePageOpener from './Components/HomePageOpener';
import NewsLetter from './Components/NewsLetter';
import { PopularPosts } from './Components/PopularPosts';
import theme, { ThemeProvider, CssBaseline } from './Components/Theme';

const App = () => {

  return (
    
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Header /> 
      <HomePageOpener />
      <BasicSearch />
      <PopularPosts />
      <NewsLetter />
      <Footer />
    </ThemeProvider>

  )
}

export default App
