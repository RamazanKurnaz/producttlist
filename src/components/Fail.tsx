import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Fail: FC = ({error:any}) => (
  
     
        <Box 
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          p={4}
          sx={{ backgroundColor: '#faf7f5', pt: '100px' }}
        >
          <Typography variant="h6" sx={{ color: '#dc2626' }} gutterBottom>
            {error || 'Failed to load products'}
          </Typography>
        </Box>
)

export default Fail;
