import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Input,
  InputGroup,
  Group,
  Button,
  VStack,
  Spinner,
  Container,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { Search, Package, Eye, Plus } from 'lucide-react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, ADD_TO_CART, GET_CART } from '../lib/queries';

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
  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART }],
  });

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

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart({ variables: { productId } });
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" alignItems="center" minH="400px">
        <VStack gap={4}>
          <Spinner size="xl" color="blue.500" borderWidth="4px" />
          <Text color="gray.600">Loading products...</Text>
        </VStack>
      </Flex>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box bg="red.50" color="red.600" p={4} borderRadius="lg">
          Error loading products: {error.message}
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={6} alignItems="stretch">
        <Box bg="white" p={6} borderRadius="xl" shadow="sm">
          <VStack gap={4} alignItems="stretch">
            <Group gap={4} flexWrap="wrap">
              <InputGroup style={{ flex: 1, maxWidth: '400px', minWidth: '200px' }}>
                <Box position="relative" width="100%">
                  <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray">
                    <Search size={18} />
                  </Box>
                  <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    bg="gray.50"
                    pl={10}
                  />
                </Box>
              </InputGroup>

              <Group gap={3}>
                <Box minW="160px">
                  <select
                    value={priceFilter}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriceFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: '#f7fafc',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  >
                    <option value="all">All Prices</option>
                    <option value="under25">Under $25</option>
                    <option value="25to50">$25 - $50</option>
                    <option value="50to100">$50 - $100</option>
                    <option value="over100">Over $100</option>
                  </select>
                </Box>

                <Box minW="160px">
                  <select
                    value={stockFilter}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStockFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: '#f7fafc',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  >
                    <option value="all">All Stock</option>
                    <option value="inStock">In Stock</option>
                    <option value="lowStock">Low Stock</option>
                    <option value="outOfStock">Out of Stock</option>
                  </select>
                </Box>
              </Group>
            </Group>

            <Text color="gray.500" fontSize="sm">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </Text>
          </VStack>
        </Box>

        {filteredProducts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
            {filteredProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewDetails}
                onAddToCart={handleAddToCart}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Box bg="white" p={12} borderRadius="xl" textAlign="center" shadow="sm">
            <VStack gap={4}>
              <Box color="gray.300">
                <Package size={64} />
              </Box>
              <Text color="gray.500" fontSize="lg">No products match your filters.</Text>
            </VStack>
          </Box>
        )}
      </VStack>
    </Container>
  );
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: string) => void;
  onAddToCart: (productId: string) => void;
}

function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  const getStockColor = () => {
    if (product.stock === 0) return 'red';
    if (product.stock < 5) return 'orange';
    return 'green';
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      shadow="sm"
      transition="all 0.2s"
      _hover={{ shadow: 'lg', transform: 'translateY(-4px)' }}
      cursor="pointer"
      onClick={() => onViewDetails(product.id)}
    >
      <Box
        bg="blue.50"
        h="180px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box color="gray.400">
          <Package size={64} />
        </Box>
      </Box>

      <Box p={5}>
        <Heading size="md" mb={2} lineClamp={1}>
          {product.name}
        </Heading>
        <Text color="gray.600" fontSize="sm" mb={3} lineClamp={2}>
          {product.description || 'No description available'}
        </Text>

        <Flex justify="space-between" alignItems="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
            ${product.price.toFixed(2)}
          </Text>
          <Box
            bg={`${getStockColor()}.100`}
            color={`${getStockColor()}.700`}
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="medium"
          >
            {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
          </Box>
        </Flex>

        <Flex gap={2}>
          <Button
            flex={1}
            size="sm"
            variant="outline"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onViewDetails(product.id);
            }}
          >
            <Icon boxSize={4} mr={1}>
              <Eye size={14} />
            </Icon>
            Details
          </Button>
          <Button
            flex={1}
            size="sm"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
            disabled={product.stock === 0}
          >
            <Icon boxSize={4} mr={1}>
              <Plus size={14} />
            </Icon>
            Add
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
