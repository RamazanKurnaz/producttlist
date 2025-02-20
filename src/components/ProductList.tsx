import { FC, useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDebounce } from "use-debounce";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { RootState } from '../types/product';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProducts } from '../store/productSlice';
import { useProductClick } from '../hooks/useProductClick';
import { productColumns } from '../config/tableConfig';
import ProductTable from './table/ProductTable';
import Fail from './Fail';
import Loader from './Loader';

const ProductList: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state: RootState) => state.products);
  const handleProductClick = useProductClick();
  const [filterText, setFilterText] = useState('');
  const [debouncedValue] = useDebounce(filterText, 500);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const handleRowClick = useCallback((productId: number) => {
    handleProductClick(productId);
    navigate(`/product/${productId}`);
  }, [navigate, handleProductClick]);

  const filteredProducts = items.filter(product => {
    const searchTerm = debouncedValue.toLowerCase();
    const fields = [
      product.title,
      product.description,
      product.category,
      product.price.toString()
    ].map(field => field.toLowerCase());
    
    return fields.some(field => field.includes(searchTerm));
  });

  if ((status === 'loading' || status === 'idle') && items.length === 0) {
    return <Loader />;
  }

  if (status === 'failed') {
    return <Fail />;
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#faf7f5', pt: '100px', width: '100%', m: 0, p: 0 }}>
      <Container maxWidth={false} disableGutters sx={{ width: '100%', maxWidth: '100%', m: 0, p: 0 }}>
        <Box mb={4} textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#9061F9', mb: 2, paddingTop: '70px' }}>
            Product List 
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#8B5CF6', maxWidth: 500, mx: 'auto', lineHeight: 0.1 }}>
            You can review and edit all products here
          </Typography>
          
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

        <ProductTable 
          products={filteredProducts}
          onRowClick={handleRowClick}
          headers={productColumns}
        />
      </Container>
    </Box>
  );
};

export default ProductList;
