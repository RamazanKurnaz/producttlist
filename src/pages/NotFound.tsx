import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100%',
  background: 'linear-gradient(135deg, #f0f2f5, #e1e5ea)',
  textAlign: 'center',
  padding: '2rem',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const StyledTypography = styled(Typography)({
  color: '#333',
  marginBottom: '1rem',
});

const StyledButton = styled(Button)({
  marginTop: '2rem',
  backgroundColor: '#6200EA',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4a148c',
  },
});

const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledBox>
      <Typography 
        variant="h1" 
        style={{ fontSize: '6rem', fontWeight: 'bold', color: '#6200EA' }}
      >
        404
      </Typography>
      <StyledTypography variant="h5">
        Aradığınız sayfa bulunamadı.
      </StyledTypography>
      <StyledTypography variant="body1">
        Üzgünüz, istediğiniz sayfayı bulamıyoruz. Belki de adresi yanlış yazdınız veya sayfa taşınmış olabilir.
      </StyledTypography>
      <StyledButton variant="contained" onClick={handleGoBack}>
        Geri Dön
      </StyledButton>
    </StyledBox>
  );
};

export default NotFound;
