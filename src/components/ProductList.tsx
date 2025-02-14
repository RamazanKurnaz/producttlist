import { FC, useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types/product';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProducts } from '../store/productSlice';
import { useProductClick } from '../hooks/useProductClick';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ArrowBack } from '@mui/icons-material';
import { color } from 'chart.js/helpers';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const ProductList: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state: RootState) => state.products);
  const handleProductClick = useProductClick();
  const [filterText, setFilterText] = useState(''); 

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const handleRowClick = useCallback((productId: number) => {
    handleProductClick(productId);
    navigate(`/product/${productId}`);
  }, [navigate, handleProductClick]);

  
  // const filteredProducts = items.filter(product => {
  //   const searchTerm = filterText.toLowerCase();
  //   return ( // ürün bunlardan birini içeriyiorsa gettşrsibn ürünü mantık bu
  //     product.title.toLowerCase().includes(searchTerm) ||
  //     product.description.toLowerCase().includes(searchTerm) ||
  //     product.category.toLowerCase().includes(searchTerm) ||
  //     product.price.toString().includes(searchTerm)
  //   );
  // });
  const filteredProducts = items.filter(product => {
    const searchTerm = filterText.toLowerCase();
    const fields = [
      product.title,
      product.description,
      product.category,
      product.price.toString()
    ].map(field => field.toLowerCase());
    
    return fields.some(field => field.includes(searchTerm));
});

  // Only show loading state if we don't have any items
  if ((status === 'loading' || status === 'idle') && items.length === 0) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ backgroundColor: '#faf7f5', pt: '100px' }}
      >
        <CircularProgress sx={{ color: '#9061F9' }} />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
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
    );
  }

  // const headers = ["Image","Product","Category","Price","Rating"];

  const headers = [{
    header:(parametre:string) => parametre,
     color:"#7886C7"
  },{
    header:"Product",
    color:"#7886C7"
  },
  {
    header:"Category",
    color:"#FFF2F2"
  },
  {
    header:"Price",
    color:"#7886C7"
  },
  {
    header:"Rating",
    color:"#7886C7"
  },
 ]

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        backgroundColor: '#faf7f5',
        pt: '100px',
        width: '100%',
        m: 0,
        p: 0
      }}
    >
      <Container 
        maxWidth={false}
        disableGutters
        sx={{ 
          width: '100%',
          maxWidth: '100%',
          m: 0,
          p: 0
        }}
      >
        <Box mb={4} textAlign="center">
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: '#9061F9',
              mb: 2,
            }}
          >
            Product List 
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: '#8B5CF6',
              maxWidth: 500,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            You can review and edit all products here
          </Typography>
          
          {/* ARAMA BUTON FILTRE */}
          <Box sx={{ mt: 3, mb: 2, maxWidth: 500, mx: 'auto' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search products..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#9061F9' }} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'white',
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#9061F9',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(144, 97, 249, 0.2)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#9061F9',
                  },
                }
              }}
            />
          </Box>
        </Box>

        <TableContainer 
          component={Paper} 
          sx={{ 
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.08)',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(124, 58, 237, 0.1)',
            backdropFilter: 'blur(8px)',
            height: 'calc(100vh - 250px)',
            overflowY: 'auto',
            width: '100%' // Added full width
          }}
        >
          <Table sx={{ width: '100%' }}> 
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f3ff' }}>
                {/* <TableCell width={100} sx={{ fontWeight: 600, color: '#6b7280' }}>Image</TableCell> */}
                
                {headers.map((header, index) => (<TableCell sx={{ fontWeight: 600, color: header.color ?? 'gray' }}>{typeof header.header === "string" ? header.header : header.header?.("Image")}</TableCell> ))}
                {/* <TableCell sx={{ fontWeight: 600, color: '#6b7280' }}>Category</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#6b7280' }}>Price</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#6b7280' }}>Rating</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  onClick={() => handleRowClick(product.id)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#f5f3ff',
                      transform: 'translateY(-2px)',
                    },
                    '&:last-child td': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>
                    <Box
                      component="img"
                      src={product.thumbnail}
                      alt={product.title}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 2,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 600, 
                      mb: 0.5,
                      color: '#374151',
                    }}>
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6b7280',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {product.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor: '#f5f3ff',
                        color: '#7c3aed',
                        py: 0.5,
                        px: 2,
                        borderRadius: 2,
                        display: 'inline-block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        border: '1px solid rgba(124, 58, 237, 0.2)',
                      }}
                    >
                      {product.category}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600,
                        color: '#7c3aed',
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-end',
                    }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          backgroundColor: '#ecfdf5',
                          color: '#059669',
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          fontWeight: 600,
                          border: '1px solid rgba(5, 150, 105, 0.2)',
                        }}
                      >
                        ⭐ {product.rating}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default ProductList;
