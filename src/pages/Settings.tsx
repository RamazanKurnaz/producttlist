import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';


// DialogWrapper componenti style isolation için


  

const Settings: FC = () => {
  return (
    <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
      <Box sx={{ mb: 6, textAlign: 'center',padding:"45px" }}>
        <Box
          sx={{
            width: '80px',
            height: '80px',
            borderRadius: '40px',
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            mb: 3,
          }}
        >
          <SettingsIcon 
            sx={{ 
              fontSize: '40px', 
              color: '#7C3AED',
              animation: 'spin 10s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }} 
          />
        </Box>
        
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Ayarlar
        </Typography>
      </Box>
    </Box>
  );
};

export default Settings;
