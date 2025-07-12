import './App.css';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cop from './pages/Cop';

function App() {
  return (
    <Router>
      <AppBar position="static" className='AppBar'>
        <Container>
          <Toolbar disableGutters={true}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 'bold'
                }}
              >
                DesCode
              </Link>
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link
                to="/tutorials"
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <Typography>Tutorials</Typography>
              </Link>
              <Link
                to="/code-of-practices"
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <Typography>Code of Practices</Typography>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route
            path="/"
            element={<Cop />}
          />

          <Route
            path="/cop"
            element={<Cop />}
          />

          <Route
            path="/code-of-practices"
            element={<Cop />}
          />

          <Route
            path="/tutorials"
            element={
              <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                  Tutorials
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Interactive learning experiences to build your skills
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  🚧 Tutorial content coming soon!
                </Typography>
              </Box>
            }
          />

          <Route
            path="*"
            element={
              <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                  404
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                  Page Not Found
                </Typography>
                <Typography variant="body1">
                  The page you're looking for doesn't exist.{' '}
                  <Link to="/" style={{ color: 'inherit' }}>
                    Go back home
                  </Link>
                </Typography>
              </Box>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;