import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import Feed from './pages/Feed';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Feed</Button>
          <Button color="inherit" component={Link} to="/top-users">Top Users</Button>
          <Button color="inherit" component={Link} to="/trending-posts">Trending</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        {/* <Route path="/" element={<Feed />} /> */}
        <Route path="/" element={<TopUsers />} />
        <Route path="/trending-posts" element={<TrendingPosts />} />
      </Routes>
    </Router>
  );
}

export default App;
