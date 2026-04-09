/**
 * LESSON 4: Testing Components with Hooks
 * 
 * This lesson teaches you how to test React components that use:
 * - useState - for local state
 * - useEffect - for side effects
 * - Custom hooks
 */

import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useState, useEffect } from 'react';

// ==========================================
// COMPONENTS TO TEST
// ==========================================

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1 data-testid="count">Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <h1 data-testid="timer">Time: {seconds}s</h1>
    </div>
  );
}

function FormInput() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">Submit</button>
      {submitted && <p data-testid="greeting">Hello, {name}!</p>}
    </form>
  );
}

// ==========================================
// TESTS
// ==========================================

describe('Lesson 4: Testing Components with Hooks', () => {
  
  describe('Testing useState - Counter Component', () => {
    it('renders with initial count of 0', () => {
      render(<Counter />);
      
      expect(screen.getByTestId('count').textContent).toBe('Count: 0');
    });
    
    it('increments count when Increment is clicked', () => {
      render(<Counter />);
      
      fireEvent.click(screen.getByText('Increment'));
      expect(screen.getByTestId('count').textContent).toBe('Count: 1');
    });
    
    it('decrements count when Decrement is clicked', () => {
      render(<Counter />);
      
      fireEvent.click(screen.getByText('Decrement'));
      expect(screen.getByTestId('count').textContent).toBe('Count: -1');
    });
    
    it('resets count when Reset is clicked', () => {
      render(<Counter />);
      
      fireEvent.click(screen.getByText('Increment'));
      fireEvent.click(screen.getByText('Increment'));
      fireEvent.click(screen.getByText('Increment'));
      expect(screen.getByTestId('count').textContent).toBe('Count: 3');
      
      fireEvent.click(screen.getByText('Reset'));
      expect(screen.getByTestId('count').textContent).toBe('Count: 0');
    });
  });
  
  describe('Testing useEffect - Timer Component', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    
    afterEach(() => {
      jest.useRealTimers();
    });
    
    it('renders with initial time of 0', () => {
      render(<Timer />);
      expect(screen.getByTestId('timer').textContent).toBe('Time: 0s');
    });
    
    it('updates time after interval', () => {
      render(<Timer />);
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      expect(screen.getByTestId('timer').textContent).toBe('Time: 1s');
    });
    
    it('accumulates time correctly', () => {
      render(<Timer />);
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      expect(screen.getByTestId('timer').textContent).toBe('Time: 5s');
    });
  });
  
  describe('Testing Form Input - FormInput Component', () => {
    it('renders with empty input', () => {
      render(<FormInput />);
      expect((screen.getByTestId('name-input') as HTMLInputElement).value).toBe('');
    });
    
    it('updates input value when typing', () => {
      render(<FormInput />);
      
      const input = screen.getByTestId('name-input');
      fireEvent.change(input, { target: { value: 'John' } });
      
      expect((screen.getByTestId('name-input') as HTMLInputElement).value).toBe('John');
    });
    
    it('shows greeting after submit', () => {
      render(<FormInput />);
      
      const input = screen.getByTestId('name-input');
      fireEvent.change(input, { target: { value: 'John' } });
      fireEvent.click(screen.getByText('Submit'));
      
      expect(screen.getByTestId('greeting').textContent).toBe('Hello, John!');
    });
    
    it('does not show greeting before submit', () => {
      render(<FormInput />);
      expect(screen.queryByTestId('greeting')).toBeNull();
    });
  });
});

describe('Key Concepts: Testing Hooks', () => {
  
  describe('act() - Ensuring updates are processed', () => {
    it('wrapping state updates in act() ensures they complete', () => {
      render(<Counter />);
      
      act(() => {
        fireEvent.click(screen.getByText('Increment'));
      });
      
      expect(screen.getByTestId('count').textContent).toBe('Count: 1');
    });
  });
  
  describe('Testing Multiple States', () => {
    it('handles dependent state changes', () => {
      render(<FormInput />);
      
      const input = screen.getByTestId('name-input');
      fireEvent.change(input, { target: { value: 'Alice' } });
      expect((input as HTMLInputElement).value).toBe('Alice');
      
      fireEvent.click(screen.getByText('Submit'));
      expect(screen.getByTestId('greeting').textContent).toBe('Hello, Alice!');
    });
  });
});
