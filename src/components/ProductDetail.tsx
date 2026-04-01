import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Separator,
  Spinner,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { ArrowLeft, Plus, Package, Calendar } from 'lucide-react';
import { useQuery, useMutation } from '@apollo/client';
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
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" alignItems="center" minH="400px">
        <VStack gap={4}>
          <Spinner size="xl" color="blue.500" borderWidth="4px" />
          <Text color="gray.600">Loading product...</Text>
        </VStack>
      </Flex>
    );
  }

  if (error || !data?.product) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box bg="red.50" color="red.600" p={4} borderRadius="lg">
          Error loading product: {error?.message || 'Product not found'}
        </Box>
        <Button
          onClick={onBack}
          mt={4}
          variant="ghost"
        >
          <Icon mr={2}><ArrowLeft size={16} /></Icon>
          Back to Products
        </Button>
      </Container>
    );
  }

  const product = data.product;
  const stockColor = product.stock === 0 ? 'red' : product.stock < 5 ? 'orange' : 'green';

  return (
    <Container maxW="container.xl" py={8}>
      <Button
        onClick={onBack}
        mb={6}
        variant="ghost"
      >
        <Icon mr={2}><ArrowLeft size={18} /></Icon>
        Back to Products
      </Button>

      <Box bg="white" borderRadius="2xl" overflow="hidden" shadow="lg">
        <Flex direction={{ base: 'column', lg: 'row' }}>
          <Box
            flex={1}
            bg="blue.50"
            minH={{ lg: '500px' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={12}
          >
            <Box color="gray.300">
              <Package size={160} />
            </Box>
          </Box>

          <Box flex={1} p={8} bg="white">
            <VStack alignItems="stretch" gap={6}>
              <Heading size="2xl">{product.name}</Heading>

              <Heading size="3xl" color="blue.500">
                ${product.price.toFixed(2)}
              </Heading>

              <Box
                bg={`${stockColor}.100`}
                color={`${stockColor}.700`}
                px={4}
                py={2}
                borderRadius="full"
                fontWeight="medium"
                w="fit-content"
              >
                {product.stock === 0
                  ? 'Out of Stock'
                  : product.stock < 5
                  ? `Only ${product.stock} left in stock!`
                  : `${product.stock} in stock`}
              </Box>

              <Separator />

              <Box>
                <Heading size="md" mb={3}>Description</Heading>
                <Text color="gray.600" fontSize="lg" lineHeight="tall">
                  {product.description || 'No description available for this product.'}
                </Text>
              </Box>

              <Box bg="gray.50" p={4} borderRadius="lg">
                <VStack alignItems="stretch" gap={2}>
                  <HStack>
                    <Icon color="gray"><Calendar size={16} /></Icon>
                    <Text fontSize="sm" color="gray.600">
                      Created: {new Date(product.createdAt).toLocaleDateString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon color="gray"><Calendar size={16} /></Icon>
                    <Text fontSize="sm" color="gray.600">
                      Updated: {new Date(product.updatedAt).toLocaleDateString()}
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              <Button
                size="lg"
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
                onClick={handleAddToCart}
                loading={adding}
                disabled={product.stock === 0}
                w="full"
                py={7}
                fontSize="lg"
              >
                <Icon mr={2}><Plus size={20} /></Icon>
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}
