import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct } from '../store/productSlice';
import { useState } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === parseInt(id))
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProduct(product);
  };

  const handleSave = () => {
    dispatch(updateProduct(editedProduct));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            rows="3"
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
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Price:</span> ${product.price}
                </p>
                <p>
                  <span className="font-semibold">Category:</span>{' '}
                  {product.category}
                </p>
                <p>
                  <span className="font-semibold">Brand:</span> {product.brand}
                </p>
                <p>
                  <span className="font-semibold">Rating:</span>{' '}
                  {product.rating} / 5
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
