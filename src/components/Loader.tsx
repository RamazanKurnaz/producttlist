import { FC } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


const Loader: FC = () => (
  
 <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
    sx={{ backgroundColor: '#faf7f5', pt: '100px' }}
  >
    <CircularProgress sx={{ color: '#9061F9' }} />
  </Box>)
;

export default Loader;
