import {
  Box,
  Flex,
  HStack,
  Badge,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { ShoppingCart, Package } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_CART } from '../lib/queries';
import { Cart } from './Cart';

export function Navbar() {
  const { open: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const { data } = useQuery(GET_CART);
  const itemCount = data?.cart?.cartItems?.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0) || 0;
  const total = data?.cart?.total || 0;

  return (
    <>
      <Box bg="white" px={6} py={4} shadow="sm" position="sticky" top={0} zIndex={100}>
        <Flex maxW="1400px" mx="auto" alignItems="center" justifyContent="space-between">
          <HStack gap={2}>
            <Box color="blue.500">
              <Package size={28} />
            </Box>
            <Text fontSize="xl" fontWeight="bold" color="blue.500">
              Nikyaa Store
            </Text>
          </HStack>

          <Button
            onClick={onCartOpen}
            position="relative"
            bg="blue.50"
            color="blue.600"
            borderRadius="lg"
            px={4}
            py={2}
            _hover={{ bg: 'blue.100' }}
          >
            <ShoppingCart size={18} />
            <Text ml={2}>Cart</Text>
            {itemCount > 0 && (
              <Badge
                colorPalette="red"
                position="absolute"
                top="-8px"
                right="-8px"
                borderRadius="full"
                px={2}
                fontSize="xs"
              >
                {itemCount}
              </Badge>
            )}
            {total > 0 && (
              <Text ml={2} fontWeight="semibold" display={{ base: 'none', md: 'inline' }}>
                ${total.toFixed(2)}
              </Text>
            )}
          </Button>
        </Flex>
      </Box>

      <Cart isOpen={isCartOpen} onClose={onCartClose} />
    </>
  );
}
