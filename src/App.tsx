import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const About = () => (
  <Box 
    display="flex" 
    alignItems="center" 
    justifyContent="center" 
    minHeight="calc(100vh - 100px)"
    sx={{ mt: '100px', px: 3 }}
  >
    <Paper 
      elevation={0}
      sx={{ 
        maxWidth: 600,
        p: 4,
        borderRadius: '24px',
        background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
        boxShadow: '0 8px 32px rgba(124, 58, 237, 0.1)',
        textAlign: 'center'
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 600,
          color: '#7C3AED',
          mb: 3
        }}
      >
        About Us
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#6B7280',
          lineHeight: 1.8,
          mb: 3
        }}
      >
        Welcome to MyStore, your premier destination for quality products. We pride ourselves on offering a carefully curated selection of items that meet our high standards for quality and value.
      </Typography>
      <Typography 
        variant="body1"
        sx={{ 
          color: '#6B7280',
          lineHeight: 1.8
        }}
      >
        Our mission is to provide you with an exceptional shopping experience, combining beautiful design with seamless functionality.
      </Typography>
    </Paper>
  </Box>
);

const Settings = () => (
  <Box 
    display="flex" 
    alignItems="center" 
    justifyContent="center" 
    minHeight="calc(100vh - 100px)"
    sx={{ mt: '100px', px: 3 }}
  >
    <Paper 
      elevation={0}
      sx={{ 
        maxWidth: 600,
        p: 4,
        borderRadius: '24px',
        background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
        boxShadow: '0 8px 32px rgba(124, 58, 237, 0.1)',
        textAlign: 'center'
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 600,
          color: '#7C3AED',
          mb: 3
        }}
      >
        Settings
      </Typography>
      <Typography 
        variant="body1"
        sx={{ 
          color: '#6B7280',
          lineHeight: 1.8
        }}
      >
        We're currently working on bringing you customization options to enhance your shopping experience. Stay tuned for updates!
      </Typography>
    </Paper>
  </Box>
);

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Box sx={{ 
          minHeight: '100vh', 
          bgcolor: '#F9FAFB',
          position: 'relative',
          pt: '80px'
        }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Router>
    </Provider>
  );
};

export default App;
