import { useState } from 'react';
import {
  Dialog,
  Box,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useQuery, useMutation } from '@apollo/client';
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
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
    setUpdatingId(null);
  };

  const handleRemove = async (id: string) => {
    try {
      await removeFromCart({ variables: { id } });
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  const cart = data?.cart;
  const items = cart?.cartItems || [];
  const total = cart?.total || 0;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="md">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="white" maxH="100vh" overflow="hidden">
          <Dialog.Header borderBottomWidth="1px" p={4}>
            <Dialog.Title>
              <HStack>
                <ShoppingBag size={24} />
                <Text>Your Cart</Text>
                {items.length > 0 && (
                  <Box bg="blue.100" color="blue.700" px={2} py={1} borderRadius="md" fontSize="sm">
                    {items.length} items
                  </Box>
                )}
              </HStack>
            </Dialog.Title>
            <Dialog.CloseTrigger position="absolute" top={4} right={4} />
          </Dialog.Header>

          <Dialog.Body p={4} overflowY="auto">
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" h="100%">
                <Text color="gray.500">Loading...</Text>
              </Box>
            ) : items.length === 0 ? (
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" h="100%" py={12}>
                <VStack gap={4}>
                  <Box color="gray.300">
                    <ShoppingBag size={80} />
                  </Box>
                  <Text fontSize="lg" color="gray.500">Your cart is empty</Text>
                  <Button bg="blue.500" color="white" _hover={{ bg: 'blue.600' }} onClick={onClose}>
                    Start Shopping
                  </Button>
                </VStack>
              </Box>
            ) : (
              <VStack gap={4} alignItems="stretch" py={4}>
                {items.map((item: CartItem) => (
                  <Box
                    key={item.id}
                    bg="gray.50"
                    p={4}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="gray.100"
                  >
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="semibold" fontSize="md" lineClamp={1}>
                        {item.product.name}
                      </Text>
                      <Text fontWeight="bold" color="blue.500">
                        ${item.subtotal.toFixed(2)}
                      </Text>
                    </HStack>

                    <Text fontSize="sm" color="gray.500" mb={3}>
                      ${item.product.price.toFixed(2)} each
                    </Text>

                    <HStack justify="space-between">
                      <HStack
                        gap={2}
                        bg="white"
                        p={1}
                        borderRadius="md"
                        border="1px solid"
                        borderColor="gray.200"
                      >
                        <IconButton
                          aria-label="Decrease quantity"
                          size="xs"
                          variant="ghost"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={updatingId === item.id || item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </IconButton>
                        <Text fontWeight="semibold" minW="30px" textAlign="center">
                          {item.quantity}
                        </Text>
                        <IconButton
                          aria-label="Increase quantity"
                          size="xs"
                          variant="ghost"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={updatingId === item.id || item.quantity >= item.product.stock}
                        >
                          <Plus size={14} />
                        </IconButton>
                      </HStack>

                      <IconButton
                        aria-label="Remove item"
                        size="sm"
                        variant="ghost"
                        color="red.500"
                        onClick={() => handleRemove(item.id)}
                        disabled={updatingId === item.id}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </Dialog.Body>

          {items.length > 0 && (
            <Dialog.Footer borderTopWidth="1px" p={4}>
              <VStack gap={3} w="full">
                <HStack w="full" justify="space-between">
                  <Text fontSize="xl" fontWeight="bold">Total</Text>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                    ${total.toFixed(2)}
                  </Text>
                </HStack>

                <Button
                  w="full"
                  py={6}
                  fontSize="md"
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  color="red.500"
                  size="sm"
                  w="full"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </VStack>
            </Dialog.Footer>
          )}
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
