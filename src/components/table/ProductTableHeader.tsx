import { FC } from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ProductTableHeaderProps } from './types';

const ProductTableHeader: FC<ProductTableHeaderProps> = ({ headers }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((column, index) => (
          <TableCell
            key={index}
            sx={{
              color: column.color,
              fontWeight: 600,
              backgroundColor: 'rgb(229, 215, 254)',
              borderBottom: '1px solid rgba(124, 58, 237, 0.1)'
            }}
          >
            {column.header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ProductTableHeader;
