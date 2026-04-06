import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';

jest.mock('../lib/queries', () => ({
  GET_CART: { kind: 'Document', definitions: [] },
  UPDATE_CART_ITEM: { kind: 'Document', definitions: [] },
  REMOVE_FROM_CART: { kind: 'Document', definitions: [] },
  CLEAR_CART: { kind: 'Document', definitions: [] },
}));

jest.mock('lucide-react', () => ({
  Minus: () => 'Minus',
  Plus: () => 'Plus',
  Trash2: () => 'Trash2',
  ShoppingBag: () => 'ShoppingBag',
}));

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(() => ({
    data: { cart: { cartItems: [], total: 0 } },
    loading: false,
  })),
  useMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}));

import { Cart } from '../components/Cart';

const system = createSystem(defaultConfig);

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={system}>{ui}</ChakraProvider>);
};

describe('Cart', () => {
  it('shows empty cart message when no items', async () => {
    renderWithChakra(<Cart isOpen={true} onClose={jest.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText('Your cart is empty')).toBeTruthy();
    });
  });

  it('calls onClose when Start Shopping button is clicked', async () => {
    const onClose = jest.fn();
    renderWithChakra(<Cart isOpen={true} onClose={onClose} />);
    
    await waitFor(() => {
      expect(screen.getByText('Start Shopping')).toBeTruthy();
    });
    
    fireEvent.click(screen.getByText('Start Shopping'));
    expect(onClose).toHaveBeenCalled();
  });
});
