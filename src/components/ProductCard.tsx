import { Plus, Eye, Package } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { ADD_TO_CART, GET_CART } from '../lib/queries';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: string) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [addToCart, { loading: adding }] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART }],
  });

  const handleAddToCart = async () => {
    if (product.stock === 0) return;
    try {
      await addToCart({ variables: { productId: product.id } });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <div className="product-placeholder">
          <Package size={48} />
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {product.description || 'No description available'}
        </p>
        <div className="product-meta">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className={`product-stock ${product.stock === 0 ? 'out-of-stock' : product.stock < 5 ? 'low-stock' : ''}`}>
            {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
          </span>
        </div>
        <div className="product-actions">
          <button
            className="btn-secondary"
            onClick={() => onViewDetails(product.id)}
          >
            <Eye size={16} />
            Details
          </button>
          <button
            className="btn-primary"
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
          >
            <Plus size={16} />
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
