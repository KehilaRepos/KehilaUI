import CreatePost from './Components/CreatePost';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Homepage from './Components/Homepage';
import theme, { ThemeProvider, CssBaseline } from './Components/Theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Rest of the imports remain the same

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/create-post" element={ <CreatePost /> } />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App
