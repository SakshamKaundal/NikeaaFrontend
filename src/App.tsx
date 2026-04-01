import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo';
import { Navbar } from './components/Navbar';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';

type View = 'list' | 'detail';

function App() {
  const [view, setView] = useState<View>('list');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleViewDetails = (id: string) => {
    setSelectedProductId(id);
    setView('detail');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedProductId(null);
  };

  return (
    <ApolloProvider client={client}>
      <Navbar />

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
    </ApolloProvider>
  );
}

export default App;
