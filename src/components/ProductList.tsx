import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Search, Filter } from 'lucide-react';
import { GET_PRODUCTS } from '../lib/queries';
import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
}

interface ProductListProps {
  onViewDetails: (id: string) => void;
}

export function ProductList({ onViewDetails }: ProductListProps) {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  const products = data?.products ?? [];
  
  const filteredProducts = products.filter((p: Product) => {
    const searchLower = search.toLowerCase();
    const matchesSearch = !search || 
      p.name.toLowerCase().includes(searchLower) ||
      (p.description && p.description.toLowerCase().includes(searchLower));
    
    const matchesPrice = priceFilter === 'all' || 
      (priceFilter === 'under25' && p.price < 25) ||
      (priceFilter === '25to50' && p.price >= 25 && p.price <= 50) ||
      (priceFilter === '50to100' && p.price > 50 && p.price <= 100) ||
      (priceFilter === 'over100' && p.price > 100);
    
    const matchesStock = stockFilter === 'all' ||
      (stockFilter === 'inStock' && p.stock > 0) ||
      (stockFilter === 'lowStock' && p.stock > 0 && p.stock < 5) ||
      (stockFilter === 'outOfStock' && p.stock === 0);
    
    return matchesSearch && matchesPrice && matchesStock;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading products: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="filters">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <Filter size={18} />
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Prices</option>
            <option value="under25">Under $25</option>
            <option value="25to50">$25 - $50</option>
            <option value="50to100">$50 - $100</option>
            <option value="over100">Over $100</option>
          </select>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Stock</option>
            <option value="inStock">In Stock</option>
            <option value="lowStock">Low Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
      </div>

      <p className="results-count">
        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
      </p>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No products match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
