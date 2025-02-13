import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Store as StoreIcon } from '@mui/icons-material';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  // Get the current tab value based on the path
  const getCurrentTab = () => {
    if (location.pathname === '/') return '/';
    if (location.pathname === '/about') return '/about';
    if (location.pathname === '/settings') return '/settings';
    if (location.pathname.startsWith('/product/')) return '/';
    return location.pathname;
  };

  return (
    <Box 
      sx={{ 
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1100,
        width: 'auto',
      }}
    >
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: '30px',
          boxShadow: '0 4px 20px rgba(175, 245, 110, 0.1)',
          width: 'auto',
          maxWidth: '600px',
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', px: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
            mr: 2,
            cursor: 'pointer'
          }} onClick={() => navigate('/')}>
            <StoreIcon sx={{ 
              color: '#9061F9',
              fontSize: '1.5rem'
            }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#9061F9',
                fontSize: '1.1rem'
              }}
            >
              MyStore
            </Typography>
          </Box>

          <Tabs 
            value={getCurrentTab()} 
            onChange={handleChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                minWidth: 80,
                color: '#8B5CF6',
                transition: 'all 0.3s ease-in-out',
                borderRadius: '20px',
                mx: 0.5,
                outline: 'none', // Tıklama outline'ını kaldırır
                '&:focus': {     // Focus durumunda outline'ı özelleştir
                  outline: 'none',
                  border: '1px solid #9061F9' // İsterseniz özel border ekleyebilirsiniz
                },
                '&:hover': {
                  color: '#7C3AED',
                  backgroundColor: 'rgba(139, 92, 246, 0.08)',
                }
              },
              '& .Mui-selected': {
                color: '#7C3AED !important',
                fontWeight: 600,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#7C3AED',
                height: '3px',
                borderRadius: '2px',
              }
            }}
          >
            <Tab 
              label="Products" 
              value="/"
            />
            <Tab 
              label="About" 
              value="/about"
            />
            <Tab 
              label="Settings" 
              value="/settings"
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
