import { FC } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; // Import Typography
import { ProductTableRowProps } from './types';

const ProductTableRow: FC<ProductTableRowProps> = ({ product, onClick }) => {
  return (
    <TableRow
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(124, 58, 237, 0.05)',
        },
        transition: 'background-color 0.2s ease',
      }}
    >
      <TableCell>
        <Box
          component="img" // Use Box component with "img" to render images
          src={product.thumbnail} // Changed product.image to product.thumbnail
          alt={product.title}
          sx={{
            width: 50,
            height: 50,
            objectFit: 'contain',
          }}
        />
      </TableCell>
      <TableCell>
        <Box>
          <Typography sx={{ fontWeight: 600, color: '#374151' }}>{product.title}</Typography> {/* Use Typography */}
          <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>{product.description.slice(0, 100)}...</Typography> {/* Use Typography */}
        </Box>
      </TableCell>
      <TableCell sx={{ color: '#6B7280' }}>
        <Box // Added Box component for consistent styling
          sx={{
            backgroundColor: 'rgba(107, 114, 128, 0.1)', // Light gray background
            borderRadius: '4px', // Rounded corners
            padding: '2px 6px', // Padding for better visual appearance
            display: 'inline-block', // Make the background fit the content
          }}
        >
          {product.category}
        </Box>
      </TableCell>
      <TableCell sx={{ color: '#374151', fontWeight: 600 }}>${product.price.toFixed(2)}</TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={product.rating} readOnly precision={0.5} size="small" /> 
          
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
