import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings: FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        minHeight: 'calc(100vh - 180px)', // Account for navbar and padding
      }}
    >
      {/* Left Sidebar */}
      <Box
        sx={{
          width: '300px',
          backgroundColor: '#F9FAFB',
          borderRight: '1px solid #E5E7EB',
          height: '100%',
          padding: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: '#374151' }}>
          Ayarlar Menüsü
        </Typography>
        {/* Add menu items here later */}
      </Box>

      {/* Main Content */}
      <Box 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 3
        }}
      >
        <Box
          sx={{
            width: '80px',
            height: '80px',
            borderRadius: '40px',
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <SettingsIcon 
            sx={{ 
              fontSize: '40px', 
              color: '#7C3AED',
              animation: 'spin 10s linear infinite',
              '@keyframes spin': {
                '0%': {
                  transform: 'rotate(0deg)',
                },
                '100%': {
                  transform: 'rotate(360deg)',
                },
              },
            }} 
          />
        </Box>
        
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600,
            color: '#1F2937',
            mb: 2
          }}
        >
          Ayarlar
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#6B7280',
            maxWidth: '500px',
            lineHeight: 1.6
          }}
        >
          Yakında burada ayarlar ve özelleştirme seçenekleri olacak. Şu anda geliştirme aşamasında...
        </Typography>
      </Box>
    </Box>
  );
};

export default Settings;
