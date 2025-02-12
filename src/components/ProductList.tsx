import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types/product';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProducts } from '../store/productSlice';

const ProductList: FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="text-center">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="p-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
