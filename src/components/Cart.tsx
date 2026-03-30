import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import {
  GET_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from '../lib/queries';

interface CartItem {
  id: string;
  quantity: number;
  subtotal: number;
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
  };
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { data, loading } = useQuery(GET_CART);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [updateCartItem] = useMutation(UPDATE_CART_ITEM, {
    refetchQueries: [{ query: GET_CART }],
  });

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [{ query: GET_CART }],
  });

  const [clearCart] = useMutation(CLEAR_CART, {
    refetchQueries: [{ query: GET_CART }],
  });

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;
    setUpdatingId(id);
    try {
      await updateCartItem({ variables: { id, quantity } });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
    setUpdatingId(null);
  };

  const handleRemove = async (id: string) => {
    try {
      await removeFromCart({ variables: { id } });
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleClearCart = async () => {
    if (!confirm('Are you sure you want to clear the cart?')) return;
    try {
      await clearCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const cart = data?.cart;
  const items = cart?.cartItems || [];
  const total = cart?.total || 0;

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>
            <ShoppingBag size={20} />
            Your Cart
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="cart-loading">
            <div className="spinner"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} />
            <p>Your cart is empty</p>
            <button className="btn-primary" onClick={onClose}>
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item: CartItem) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.product.name}</h4>
                    <p className="cart-item-price">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={updatingId === item.id || item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={updatingId === item.id || item.quantity >= item.product.stock}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="cart-item-subtotal">
                      ${item.subtotal.toFixed(2)}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                      disabled={updatingId === item.id}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="btn-primary checkout-btn">
                Proceed to Checkout
              </button>
              <button className="btn-secondary clear-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
