/**
 * LESSON 2: Testing Utilities Explained
 * 
 * This file teaches you all the core testing utilities
 */

import '@testing-library/jest-dom';
import { describe, it, expect } from '@jest/globals';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';

// ==========================================
// THE FOUR CORE TESTING UTILITIES
// ==========================================

// 1. render() - Puts your React component on a "virtual page"
//    Think of it like opening a browser, but in code

// 2. screen - An object with all the "query" functions
//    Use these to find elements on the page

// 3. fireEvent - Simulates user actions (click, type, etc.)

// 4. waitFor - Waits for something async to complete


// ==========================================
// SCREEN QUERY FUNCTIONS (How to find elements)
// ==========================================

/**
 * getBy... functions - Find ONE element (throws error if not found)
 * 
 * getByText()      - Find by text content
 * getByRole()      - Find by ARIA role (button, heading, etc.)
 * getByLabelText() - Find form inputs by their label
 * getByPlaceholderText() - Find inputs by placeholder
 * getByTestId()    - Find by data-testid attribute
 * 
 * queryBy... functions - Same but returns null instead of throwing
 * 
 * findBy... functions - Returns a Promise (for async elements)
 */

// ==========================================
// EXAMPLE: A Simple Component to Test
// ==========================================

function SimpleCounter() {
  return (
    <div>
      <h1>Counter: 0</h1>
      <button>Increment</button>
      <button>Decrement</button>
    </div>
  );
}

describe('Lesson 2: Testing Utilities', () => {
  
  describe('1. render() function', () => {
    it('renders a simple component', () => {
      const { container } = render(<SimpleCounter />);
      expect(container).toBeTruthy();
    });
  });

  describe('2. screen and query functions', () => {
    it('finds elements by text', () => {
      render(<SimpleCounter />);
      
      const heading = screen.getByText('Counter: 0');
      expect(heading).toBeTruthy();
      
      const heading2 = screen.getByText(/Counter/);
      expect(heading2).toBeTruthy();
    });

    it('finds elements by role', () => {
      render(<SimpleCounter />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2);
    });

    it('queryBy returns null when not found (no throw)', () => {
      render(<SimpleCounter />);
      
      const nonExistent = screen.queryByText('NonExistent');
      expect(nonExistent).toBeNull();
    });
  });

  describe('3. fireEvent - Simulating user actions', () => {
    it('clicks a button', () => {
      render(<SimpleCounter />);
      
      const incrementButton = screen.getByText('Increment');
      fireEvent.click(incrementButton);
      
      expect(screen.getByText('Counter: 0')).toBeTruthy();
    });
  });

  describe('4. waitFor - Waiting for async things', () => {
    it('waits for an element to appear', async () => {
      render(<SimpleCounter />);
      
      await waitFor(() => {
        expect(screen.getByText('Counter: 0')).toBeTruthy();
      });
    });
  });

  describe('5. within - Scoped queries', () => {
    it('finds elements inside a specific container', () => {
      render(
        <div>
          <div data-testid="outer">Outer
            <div data-testid="inner">Inner</div>
          </div>
        </div>
      );
      
      const outer = screen.getByTestId('outer');
      const inner = within(outer).getByTestId('inner');
      expect(inner.textContent).toBe('Inner');
    });
  });
});
