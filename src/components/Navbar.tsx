import { ShoppingCart, Package } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_CART } from '../lib/queries';

interface NavbarProps {
  onCartClick: () => void;
  onHomeClick: () => void;
}

export function Navbar({ onCartClick, onHomeClick }: NavbarProps) {
  const { data } = useQuery(GET_CART);
  const itemCount = data?.cart?.cartItems?.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0) || 0;
  const total = data?.cart?.total || 0;

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={onHomeClick}>
        <Package className="logo-icon" />
        <span>Nikyaa Store</span>
      </div>
      <button className="cart-button" onClick={onCartClick}>
        <ShoppingCart size={20} />
        <span className="cart-badge">{itemCount}</span>
        {total > 0 && <span className="cart-total">${total.toFixed(2)}</span>}
      </button>
    </nav>
  );
}
