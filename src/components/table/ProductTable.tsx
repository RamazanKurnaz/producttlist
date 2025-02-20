import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import ProductTableHeader  from './ProductTableHeader';

import ProductTableRow from './ProductTableRow';
import { ProductTableProps } from './types';

const ProductTable: FC<ProductTableProps> = ({ products, onRowClick, headers }) => {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.08)',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: 'white',
        border: '1px solid rgba(124, 58, 237, 0.1)',
        backdropFilter: 'blur(8px)',
        height: 'calc(100vh - 250px)',
        overflowY: 'auto',
        width: '100%',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(124, 58, 237, 0.3)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(124, 58, 237, 0.5)',
        }
      }}
    >
      <Table stickyHeader>
        <ProductTableHeader headers={headers} />
        <TableBody>
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              onClick={() => onRowClick(product.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;