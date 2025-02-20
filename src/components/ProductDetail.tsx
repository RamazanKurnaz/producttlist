import { FC, useState, ChangeEvent, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, Product } from '../types/product';
import { useAppDispatch } from '../hooks/useAppDispatch';

import { updateProduct, setSelectedProduct, clearSelectedProduct, setUpdateStatus } from '../store/productSlice';
// fetchProductById'yi kaldırdık
import { trackProductClick } from '../store/clickTrackingSlice';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { selectedProduct, items, status, error, updateStatus } = useSelector(
    (state: RootState) => state.products
  );
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  // İlk render'da ve id değiştiğinde çalışacak
  useEffect(() => {
    if (id) {
      const numericId = Number(id);
      const productFromStore = items.find(item => item.id === numericId);
      
      if (productFromStore && !selectedProduct) {
        dispatch(setSelectedProduct(numericId));
      }
    }
  }, [id, items, selectedProduct, dispatch]);

  // selectedProduct değiştiğinde editedProduct'ı güncelle
  useEffect(() => {
    if (selectedProduct && !editedProduct) {
      setEditedProduct(selectedProduct);
    }
  }, [selectedProduct]); // editedProduct'ı dependency array'den çıkardık

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(setUpdateStatus('idle'));
    };
  }, [dispatch]);

  //  local state ile tututor degsılıklerı prducto
  useEffect(() => {
    if (selectedProduct) {
      setEditedProduct(selectedProduct);
    }
  }, [selectedProduct]);

  // Handle başarıyla alırsa
  useEffect(() => {
    if (updateStatus === 'succeeded') {
      setIsEditing(false);
      dispatch(setUpdateStatus('idle'));
    }
  }, [updateStatus, dispatch]);

  const handleEdit = useCallback(() => {
    if (selectedProduct) {
      setIsEditing(true);
      setEditedProduct({ ...selectedProduct });
    }
  }, [selectedProduct]);

  const handleSave = useCallback(() => {
    if (editedProduct && selectedProduct) {
      const updatedProduct: Product = {
        ...selectedProduct,
        title: editedProduct.title.trim(),
        description: editedProduct.description.trim()
      };

      dispatch(updateProduct(updatedProduct));
    }
  }, [dispatch, editedProduct, selectedProduct]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value
      };
    });
  }, []);

  const handleCancel = useCallback(() => {
    if (selectedProduct) {
      setEditedProduct(selectedProduct);
      setIsEditing(false);
    }
  }, [selectedProduct]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#FEF2F2' }}>
          <Typography color="error" variant="h6" gutterBottom>
            Error Loading Product
          </Typography>
          <Typography color="error.dark">{error || 'Failed to load product'}</Typography>
        </Paper>
      </Container>
    );
  }

  if (!selectedProduct || !editedProduct) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">Product not found</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          borderRadius: '24px',
          background: 'linear-gradient(145deg,rgb(233, 230, 240), #f5f5f5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}
      >
        <IconButton 
          onClick={() => navigate('/')}
          sx={{ 
            mb: 3,
            bgcolor: 'rgb(115, 102, 211)',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.main',
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {selectedProduct.thumbnail && (
              <Paper 
                elevation={0}
                sx={{
                  height: 400,
                  overflow: 'hidden',
                  borderRadius: '24px',
                  position: 'relative',
                  boxShadow: '0 8px 32px rgba(255, 7, 7, 0.08)',
                  '& img': {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }
                }}
              >
                <img
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                />
              </Paper>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 600,
                  background: 'linear-gradient(45deg,rgb(232, 56, 202),rgb(236, 85, 180))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                {selectedProduct.title}
              </Typography>
              <Button
                variant="contained"
                onClick={handleEdit}
                startIcon={<EditIcon />}
                sx={{ 
                  borderRadius: '12px',
                  px: 3,
                  textTransform: 'none',
                  background: 'linear-gradient(45deg,rgb(183, 88, 234),rgb(127, 186, 235))',
                  boxShadow: '0 4px 10px rgba(199, 217, 217, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg,rgb(218, 166, 231),rgb(189, 129, 205))'
                  }
                }}
              >
                Edit
              </Button>
            </Box>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                lineHeight: 1.8,
                mb: 4
              }}
            >
              {selectedProduct.description}
            </Typography>

            <Paper 
              variant="outlined" 
              sx={{ 
                p: 3, 
                mt: 3, 
                borderRadius: '16px',
                border: 'none',
                bgcolor: 'rgba(173, 133, 88, 0.04)',
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>Price</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#1976d2' }}>
                    ${selectedProduct.price}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>Category</Typography>
                  <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {selectedProduct.category}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>Brand</Typography>
                  <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {selectedProduct.brand}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>Rating</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating 
                      value={selectedProduct.rating} 
                      precision={0.5} 
                      readOnly 
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#1976d2'
                        }
                      }}
                    />
                    <Typography sx={{ color: 'text.secondary' }}>
                      ({selectedProduct.rating}/5)
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Edit Modal */}
        <Dialog
          open={isEditing}
          onClose={handleCancel}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '24px',
              bgcolor: '#fff',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
            }
          }}
        >
          <DialogTitle sx={{ 
            pb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
              Edit Product
            </Typography>
            <IconButton
              onClick={handleCancel}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Box component="form" sx={{ mt: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={editedProduct?.title || ''}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={editedProduct?.description || ''}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={updateStatus === 'loading'}
              startIcon={<CancelIcon />}
              sx={{ 
                borderRadius: '12px',
                px: 3,
                py: 1,
                textTransform: 'none'
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={updateStatus === 'loading' || 
                !editedProduct?.title.trim() || 
                !editedProduct?.description.trim()}
              startIcon={updateStatus === 'loading' ? <CircularProgress size={20} /> : <SaveIcon />}
              sx={{ 
                borderRadius: '12px',
                px: 3,
                py: 1,
                textTransform: 'none',
                background: 'linear-gradient(45deg,rgb(210, 25, 25), #42a5f5)',
                boxShadow: '0 4px 10px rgba(210, 25, 192, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg,rgb(192, 21, 21),rgb(25, 210, 139))'
                }
              }}
            >
              {updateStatus === 'loading' ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default ProductDetail;
