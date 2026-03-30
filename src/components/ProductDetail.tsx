import { useQuery, useMutation } from '@apollo/client';
import { ArrowLeft, Plus, Package, Calendar } from 'lucide-react';
import { GET_PRODUCT, ADD_TO_CART, GET_CART } from '../lib/queries';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  const [addToCart, { loading: adding }] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART }],
  });

  const handleAddToCart = async () => {
    if (!data?.product || data.product.stock === 0) return;
    try {
      await addToCart({ variables: { productId } });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !data?.product) {
    return (
      <div className="error-container">
        <p>Error loading product: {error?.message || 'Product not found'}</p>
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Products
        </button>
      </div>
    );
  }

  const product = data.product;

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to Products
      </button>

      <div className="product-detail-grid">
        <div className="product-detail-image">
          <div className="product-placeholder large">
            <Package size={120} />
          </div>
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>

          <div className="product-detail-price">
            ${product.price.toFixed(2)}
          </div>

          <div className={`product-detail-stock ${product.stock === 0 ? 'out-of-stock' : product.stock < 5 ? 'low-stock' : ''}`}>
            {product.stock === 0 ? (
              <span>Out of Stock</span>
            ) : product.stock < 5 ? (
              <span>Only {product.stock} left in stock!</span>
            ) : (
              <span>{product.stock} in stock</span>
            )}
          </div>

          <div className="product-detail-description">
            <h3>Description</h3>
            <p>{product.description || 'No description available for this product.'}</p>
          </div>

          <div className="product-detail-meta">
            <div className="meta-item">
              <Calendar size={16} />
              <span>Created: {new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="meta-item">
              <Calendar size={16} />
              <span>Updated: {new Date(product.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            className="btn-primary add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
          >
            <Plus size={18} />
            {adding ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
