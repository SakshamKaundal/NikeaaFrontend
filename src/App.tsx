import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo';
import { Navbar } from './components/Navbar';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import './App.css';

type View = 'list' | 'detail';

function App() {
  const [view, setView] = useState<View>('list');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleViewDetails = (id: string) => {
    setSelectedProductId(id);
    setView('detail');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedProductId(null);
  };

  const handleHomeClick = () => {
    setView('list');
    setSelectedProductId(null);
    setIsCartOpen(false);
  };

  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          onHomeClick={handleHomeClick}
        />

        <main className="main-content">
          {view === 'list' ? (
            <ProductList onViewDetails={handleViewDetails} />
          ) : (
            selectedProductId && (
              <ProductDetail
                productId={selectedProductId}
                onBack={handleBackToList}
              />
            )
          )}
        </main>

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;
