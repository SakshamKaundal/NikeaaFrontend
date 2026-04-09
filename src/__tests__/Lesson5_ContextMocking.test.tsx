/**
 * LESSON 5: Mocking Context and Providers
 * 
 * When testing components that use Context (like ChakraProvider),
 * you need to either:
 * 1. Use the real provider (wrapped properly)
 * 2. Mock the provider
 * 
 * This lesson teaches you the patterns!
 */

import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';

// ==========================================
// A COMPONENT THAT USES CHAKRA UI
// ==========================================

function SimpleButton() {
  return (
    <div>
      <button data-testid="primary-btn">Click Me</button>
      <span data-testid="status">Ready</span>
    </div>
  );
}

function SearchComponent() {
  return (
    <div>
      <input data-testid="search-input" type="text" placeholder="Search..." />
      <button data-testid="search-btn">Search</button>
    </div>
  );
}

// ==========================================
// MOCKING APPROACHES
// ==========================================

describe('Lesson 5: Mocking Context and Providers', () => {
  
  // -----------------------------------------
  // APPROACH 1: Using Real ChakraProvider
  // -----------------------------------------
  describe('Approach 1: Real ChakraProvider', () => {
    const system = createSystem(defaultConfig);
    
    const renderWithProvider = (ui: React.ReactElement) => {
      return render(<ChakraProvider value={system}>{ui}</ChakraProvider>);
    };
    
    it('renders button wrapped in ChakraProvider', () => {
      renderWithProvider(<SimpleButton />);
      
      expect(screen.getByTestId('primary-btn')).toBeTruthy();
      expect(screen.getByTestId('status')).toBeTruthy();
    });
    
    it('renders search component with provider', () => {
      renderWithProvider(<SearchComponent />);
      
      expect(screen.getByTestId('search-input')).toBeTruthy();
      expect(screen.getByTestId('search-btn')).toBeTruthy();
    });
    
    it('can interact with elements in provider', () => {
      renderWithProvider(<SearchComponent />);
      
      const input = screen.getByTestId('search-input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test query' } });
      
      expect(input.value).toBe('test query');
    });
  });
  
  // -----------------------------------------
  // APPROACH 2: Creating Helper Functions
  // -----------------------------------------
  describe('Approach 2: Helper Function Pattern', () => {
    const system = createSystem(defaultConfig);
    
    function renderWithChakra(ui: React.ReactElement) {
      return render(<ChakraProvider value={system}>{ui}</ChakraProvider>);
    }
    
    it('renders component using helper', () => {
      const { container } = renderWithChakra(<SimpleButton />);
      
      expect(screen.getByTestId('primary-btn')).toBeTruthy();
      expect(container).toBeTruthy();
    });
    
    it('allows multiple renders with same provider', () => {
      const { unmount } = renderWithChakra(<SimpleButton />);
      
      unmount();
      
      renderWithChakra(<SearchComponent />);
      
      expect(screen.getByTestId('search-input')).toBeTruthy();
    });
  });
  
  // -----------------------------------------
  // APPROACH 3: Mocking at Module Level
  // -----------------------------------------
  describe('Approach 3: Module-Level Mocking', () => {
    
    it('demonstrates module-level mock pattern', () => {
      const mockFn = jest.fn();
      mockFn('test');
      
      expect(mockFn).toHaveBeenCalledWith('test');
    });
    
    it('demonstrates mock return values', () => {
      const mockFn = jest.fn();
      mockFn.mockReturnValue('mocked result');
      
      expect(mockFn()).toBe('mocked result');
    });
    
    it('demonstrates mock implementation', () => {
      const mockFn = jest.fn((input: string) => `processed: ${input}`);
      
      expect(mockFn('hello')).toBe('processed: hello');
    });
  });
});

// ==========================================
// PRACTICAL PATTERN: Testing Real Components
// ==========================================

describe('Practical: Testing Real Components', () => {
  
  it('shows how to test with Apollo mock data', () => {
    // Mock Apollo useQuery - Type as any for simplicity
    const mockUseQuery: any = jest.fn();
    
    // Simulate loading state
    mockUseQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    
    expect(mockUseQuery().loading).toBe(true);
    
    // Simulate success state
    mockUseQuery.mockReturnValue({
      data: { products: [{ id: '1', name: 'Test' }] },
      loading: false,
      error: null,
    });
    
    expect(mockUseQuery().loading).toBe(false);
    expect(mockUseQuery().data.products).toHaveLength(1);
    
    // Simulate error state
    mockUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to fetch'),
    });
    
    expect(mockUseQuery().error).toBeTruthy();
  });
  
  it('understands render patterns', () => {
    const system = createSystem(defaultConfig);
    
    // Pattern 1: Simple render
    render(<ChakraProvider value={system}><SimpleButton /></ChakraProvider>);
    expect(screen.getByTestId('primary-btn')).toBeTruthy();
  });
});

// ==========================================
// KEY TAKEAWAYS
// ==========================================

describe('Key Takeaways', () => {
  it('understands when to use each approach', () => {
    /**
     * APPROACH 1: Real Provider
     * ✅ Best for: Components that use Chakra components
     * ✅ Allows: Testing actual styling/styling behavior
     * 
     * APPROACH 2: Helper Function
     * ✅ Best for: Reusable testing utilities
     * ✅ Clean: Encapsulates provider setup
     * 
     * APPROACH 3: Module Mocking
     * ✅ Best for: Mocking external libraries (Apollo, React Query)
     * ✅ Fast: No network calls
     */
    expect(true).toBe(true);
  });
});
