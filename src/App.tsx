import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import About from './pages/About';
import Settings from './pages/Settings';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import NotFound from './components/NotFound';

const NavLink: FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      style={{ textDecoration: 'none' }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.5,
          borderRadius: '50px',
          transition: 'all 0.3s ease',
          backgroundColor: isActive ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
          color: isActive ? '#7C3AED' : '#6B7280',
          '&:hover': {
            backgroundColor: isActive ? 'rgba(124, 58, 237, 0.1)' : 'rgba(124, 58, 237, 0.05)',
            color: '#7C3AED',
          },
          fontWeight: 500,
          fontSize: '0.95rem',
        }}
      >
        {children}
      </Box>
    </Link>
  );
};

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Box sx={{ 
          minHeight: '100vh', 
          bgcolor: '#F9FAFB',
          pt: '100px'
        }}>
          {/* Centered Soft Navbar */}
          <Box
            component="nav"
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              py: 3,
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderBottom: '1px solid rgba(231, 231, 231, 0.8)',
            }}
          >
            <Container maxWidth="lg">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: '#7C3AED',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Product Manager
                </Typography>
                
                {/* Tab Navigation */}
                <Paper
                  elevation={0}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    p: 0.5,
                    borderRadius: '100px',
                    backgroundColor: 'rgba(243, 244, 246, 0.7)',
                    border: '1px solid rgba(231, 231, 231, 0.8)',
                  }}
                >
                  <NavLink to="/">Ürünler</NavLink>
                  <NavLink to="/about">Analitik</NavLink>
                  <NavLink to="/settings">Ayarlar</NavLink>
                </Paper>
              </Box>
            </Container>
          </Box>

          {/* Main Content */}
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </Provider>
  );
};

export default App;
