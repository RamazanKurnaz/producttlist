import { FC, useState, ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types/product';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProductById, updateProduct, clearSelectedProduct } from '../store/productSlice';
import type { Product } from '../types/product';

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { selectedProduct, status, error } = useSelector((state: RootState) => state.products);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(selectedProduct);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    setEditedProduct(selectedProduct);
  }, [selectedProduct]);

  if (status === 'loading') {
    return <div className="text-center">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!selectedProduct || !editedProduct) {
    return <div className="text-center">Product not found</div>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedProduct) {
      dispatch(updateProduct(editedProduct));
      setIsEditing(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: name === 'price' ? Number(value) : value,
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Products
      </button>

      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{selectedProduct.title}</h1>
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{selectedProduct.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Price:</span> ${selectedProduct.price}
                </p>
                <p>
                  <span className="font-semibold">Category:</span>{' '}
                  {selectedProduct.category}
                </p>
                <p>
                  <span className="font-semibold">Brand:</span> {selectedProduct.brand}
                </p>
                <p>
                  <span className="font-semibold">Rating:</span>{' '}
                  {selectedProduct.rating} / 5
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
