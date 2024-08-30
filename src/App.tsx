
import CreatePost from './Components/CreatePost';
import Explore from './Components/Explore';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Homepage from './Components/Homepage';
import PostPage from './Components/PostPage';
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
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App
