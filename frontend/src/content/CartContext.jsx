import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext'; // Import AuthContext
import API from '../utils/api'; // Import API utility

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // This ADD_ITEM is now primarily for local state update after API call
      // The API handles the actual DB logic for adding/updating
      const existingItem = state.items.find(item => item.product._id.toString() === action.payload.product._id.toString());
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product._id.toString() === action.payload.product._id.toString()
              ? { ...item, quantity: item.quantity + action.payload.quantity } // Add quantity from payload
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload] // Payload should be { product: { ... }, quantity: 1 }
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product._id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product._id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  items: []
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user: userInfo, loading: authLoading } = useAuth(); // Get user info and loading state from AuthContext

  // Function to fetch cart from backend
  const fetchCartFromBackend = useCallback(async () => {
    if (authLoading) return;

    if (userInfo && userInfo.token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await API.get('/users/cart', config);
        dispatch({ type: 'LOAD_CART', payload: data });
      } catch (error) {
        console.error('Failed to fetch cart from backend:', error);
        // If fetching fails (e.g., token expired), clear local cart
        dispatch({ type: 'CLEAR_CART' });
      }
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [userInfo, authLoading]);

  useEffect(() => {
    fetchCartFromBackend();
  }, [userInfo, authLoading, fetchCartFromBackend]);

  const addItem = async (product, quantity = 1) => {
    if (!userInfo || !userInfo.token) {
      console.log('User not logged in. Cannot add item to cart.');
      // Optionally, you could show a notification to the user here
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await API.post('/users/cart', { productId: product._id, quantity }, config);
      dispatch({ type: 'LOAD_CART', payload: data });
    } catch (error) {
      console.error('Failed to add item to cart on backend:', error);
    }
  };

  const removeItem = async (productId) => {
    if (!userInfo || !userInfo.token) {
      console.log('User not logged in. Cannot remove item from cart.');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await API.delete(`/users/cart/${productId}`, config);
      dispatch({ type: 'LOAD_CART', payload: data });
    } catch (error) {
      console.error('Failed to remove item from cart on backend:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    if (!userInfo || !userInfo.token) {
      console.log('User not logged in. Cannot update item quantity in cart.');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      // Find current quantity to calculate delta
      const currentItem = state.items.find(item => item.product._id === productId);
      const currentQuantity = currentItem ? currentItem.quantity : 0;
      const delta = quantity - currentQuantity; // 'quantity' here is the new desired quantity

      // Send the delta to the backend
      // The backend endpoint /users/cart with POST method expects { productId, quantity }
      // The backend then adds this 'quantity' to the existing item's quantity.
      // So, we should send the delta, not the absolute new quantity.
      const { data } = await API.post('/users/cart', { productId, quantity: delta }, config);
      // The backend response 'data' should contain the updated cart items.
      // The existing dispatch({ type: 'LOAD_CART', payload: data }); will handle updating the state.
      dispatch({ type: 'LOAD_CART', payload: data });
    } catch (error) {
      console.error('Failed to update quantity on backend:', error.response?.data?.message || error.message);
    }
  };

  const clearCart = async () => {
    if (!userInfo || !userInfo.token) {
      console.log('User not logged in. Cannot clear cart.');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await API.delete('/users/cart', config);
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Failed to clear cart on backend:', error);
    }
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.product ? item.product.price : 0) * item.quantity, 0);
  };

  const getCartCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
