// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../content/CartContext';
import { useAuth } from '../content/AuthContext'; // Import useAuth
import API from '../utils/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { user } = useAuth(); // Get user from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

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

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setRelatedLoading(true);
        const { data } = await API.get('/products');
        // Filter out current product and take first 3
        const filteredProducts = data.filter(p => p._id !== id).slice(0, 3);
        setRelatedProducts(filteredProducts);
        setRelatedLoading(false);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setRelatedLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [id]);

  const handleAddToCart = () => {
    console.log('handleAddToCart called. Current user:', user);
    const productWithFullImageUrl = {
      ...product,
      image: `http://localhost:5000${product.image}`
    };
    if (!user || !user.token) {
      toast.warning('Please log in to add items to your cart.');
      navigate('/login'); // Redirect to login page
      return;
    }

    addItem(productWithFullImageUrl, quantity); // Pass product and quantity
    toast.success(`${quantity} ${product.name} added to cart!`);

  };

  const handleAddRelatedToCart = (relatedProduct) => {
    console.log('handleAddRelatedToCart called. Current user:', user);
    const productWithFullImageUrl = {
      ...relatedProduct,
      image: `http://localhost:5000${relatedProduct.image}`
    };
    if (!user || !user.token) {
      toast.warning('Please log in to add items to your cart.');
      navigate('/login'); // Redirect to login page
      return;
    }

    addItem(productWithFullImageUrl, 1); // Add 1 quantity of related product
    toast.success(`${relatedProduct.name} added to cart!`);

  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded"></div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
        <Link to="/products" className="text-indigo-600 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
        <Link to="/products" className="text-indigo-600 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-indigo-600">Home</Link> 
        <Link to="/products" className="hover:text-indigo-600 ml-2">Products</Link> 
        <span className="ml-2 text-gray-800">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="ml-2 text-gray-600">({product.reviewCount} reviews)</span>
          </div>

          <p className="text-2xl font-bold text-indigo-600 mb-6">₹{product.price.toFixed(2)}</p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Ingredients:</h3>
            <p className="text-gray-600">{product.ingredients.join(', ')}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Weight:</h3>
            <p className="text-gray-600">{product.weight}g</p>
          </div>

          <div className="flex items-center mb-6">
            <span className="mr-4 text-gray-800 font-semibold">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-gray-700 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-gray-700 hover:bg-gray-200"
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
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {product.stock === 0 && (
            <p className="text-red-600 mt-2">This product is currently out of stock</p>
          )}
          {product.stock > 0 && <p className="text-gray-600 mt-2">Only {product.stock} left in stock!</p>}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">You might also like</h2>
        {relatedLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative overflow-hidden">
                  <Link to={`/product/${relatedProduct._id}`}>
                    <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={`http://localhost:5000${relatedProduct.image}`}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                        onError={(e) => {
                          e.target.src = '/placeholder-chocolate.png'; // fallback image
                        }}
                      />
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Quick View Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
                          View Details
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Status Badges */}
                  {relatedProduct.stock === 0 && (
                    <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg border border-red-400/50">
                      OUT OF STOCK
                    </div>
                  )}

                  {/* Favorite Icon */}
                  <button
                    className={`absolute top-4 left-4 bg-white/80 hover:bg-white backdrop-blur-sm p-2 rounded-full shadow-md transition-opacity duration-300 ${
                      relatedProduct.stock > 0 && relatedProduct.stock <= 5 ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle favorite functionality
                    }}
                  >
                    <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Low Stock Badge */}
                  {relatedProduct.stock > 0 && relatedProduct.stock <= 5 && (
                    <div className="absolute top-4 left-14 bg-orange-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg border border-orange-400/50">
                      LOW STOCK
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <Link to={`/product/${relatedProduct._id}`}>
                    <h3 className="font-bold text-gray-900 hover:text-indigo-700 transition-colors duration-300 mb-3 text-lg line-clamp-2 group-hover:text-indigo-600">
                      {relatedProduct.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-2xl font-bold text-indigo-700">₹{relatedProduct.price.toFixed(2)}</p>
                    <button
                      onClick={() => handleAddRelatedToCart(relatedProduct)}
                      disabled={relatedProduct.stock === 0}
                      className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                        relatedProduct.stock > 0
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {relatedProduct.stock > 0 ? 'Add to Cart' : 'Unavailable'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-1">
                        {'★'.repeat(Math.floor(relatedProduct.rating || 4))}
                        {'☆'.repeat(5 - Math.floor(relatedProduct.rating || 4))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        ({relatedProduct.reviewCount || 0})
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-semibold text-sm">
                      {relatedProduct.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No related products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
