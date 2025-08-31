// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../content/CartContext';
import API from '../utils/api';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const productWithFullImageUrl = {
      ...product,
      image: `http://localhost:5000${product.image}`
    };
    addItem(productWithFullImageUrl, quantity); // Pass product and quantity
    alert(`${quantity} ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-amber-200 rounded w-1/3 mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-amber-100 rounded"></div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-amber-200 rounded"></div>
              <div className="h-4 bg-amber-100 rounded"></div>
              <div className="h-4 bg-amber-100 rounded"></div>
              <div className="h-4 bg-amber-100 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error: {error}</h2>
        <Link to="/products" className="text-amber-700 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Product not found</h2>
        <Link to="/products" className="text-amber-700 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm text-brown-600 mb-6">
        <Link to="/" className="hover:text-amber-700">Home</Link> &gt; 
        <Link to="/products" className="hover:text-amber-700 ml-2">Products</Link> &gt; 
        <span className="ml-2 text-brown-900">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-brown-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="ml-2 text-brown-600">({product.reviewCount} reviews)</span>
          </div>

          <p className="text-2xl font-bold text-amber-700 mb-6">${product.price.toFixed(2)}</p>

          <p className="text-brown-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-brown-900 mb-2">Ingredients:</h3>
            <p className="text-brown-600">{product.ingredients.join(', ')}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-brown-900 mb-2">Weight:</h3>
            <p className="text-brown-600">{product.weight}g</p>
          </div>

          <div className="flex items-center mb-6">
            <span className="mr-4 text-brown-900 font-semibold">Quantity:</span>
            <div className="flex items-center border border-brown-300 rounded">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-brown-700 hover:bg-amber-100"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-brown-700 hover:bg-amber-100"
              >
                +
              </button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white ${
              product.stock > 0
                ? 'bg-amber-600 hover:bg-amber-700' 
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {product.stock === 0 && (
            <p className="text-red-600 mt-2">This product is currently out of stock</p>
          )}
          {product.stock > 0 && <p className="text-brown-600 mt-2">Only {product.stock} left in stock!</p>}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-brown-900 mb-6">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* These would be actual related products in a real app */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="h-40 bg-amber-100 rounded flex items-center justify-center text-4xl mb-4">
              🍬
            </div>
            <h3 className="font-semibold text-brown-900">Chocolate Truffles</h3>
            <p className="text-amber-700 font-bold">$18.99</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="h-40 bg-amber-100 rounded flex items-center justify-center text-4xl mb-4">
              🎁
            </div>
            <h3 className="font-semibold text-brown-900">Gift Box</h3>
            <p className="text-amber-700 font-bold">$29.99</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="h-40 bg-amber-100 rounded flex items-center justify-center text-4xl mb-4">
              🍫
            </div>
            <h3 className="font-semibold text-brown-900">Chocolate Bars</h3>
            <p className="text-amber-700 font-bold">$10.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
