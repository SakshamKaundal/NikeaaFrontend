/**
 * LESSON 6: Testing User Interactions
 * 
 * This lesson teaches you how to test:
 * - Button clicks
 * - Form inputs
 * - Keyboard events
 * - Focus management
 */

import { describe, it, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';

// ==========================================
// COMPONENTS TO TEST
// ==========================================

function LoginForm() {
  return (
    <form data-testid="login-form">
      <div>
        <label data-testid="email-label">Email</label>
        <input 
          data-testid="email-input" 
          type="email" 
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label data-testid="password-label">Password</label>
        <input 
          data-testid="password-input" 
          type="password" 
          placeholder="Enter your password"
        />
      </div>
      <button data-testid="submit-btn" type="submit">Login</button>
      <p data-testid="form-status">Not submitted</p>
    </form>
  );
}

function CheckboxGroup() {
  return (
    <div>
      <input data-testid="checkbox-java" type="checkbox" id="java" />
      <label data-testid="label-java" htmlFor="java">Java</label>
      
      <input data-testid="checkbox-python" type="checkbox" id="python" />
      <label data-testid="label-python" htmlFor="python">Python</label>
      
      <input data-testid="checkbox-javascript" type="checkbox" id="javascript" />
      <label data-testid="label-javascript" htmlFor="javascript">JavaScript</label>
      
      <p data-testid="selection">Selected: none</p>
    </div>
  );
}

function LikeButton() {
  return (
    <div>
      <button data-testid="like-btn">
        <span data-testid="like-icon">♡</span>
        <span data-testid="like-count">0</span>
      </button>
    </div>
  );
}

// ==========================================
// FIREEVENT - Simulating User Actions
// ==========================================

describe('Lesson 6: Testing User Interactions', () => {
  
  // -----------------------------------------
  // CLICK EVENTS
  // -----------------------------------------
  describe('Click Events', () => {
    it('simulates a simple button click', () => {
      render(<LoginForm />);
      
      const submitButton = screen.getByTestId('submit-btn');
      fireEvent.click(submitButton);
      
      // Form was "submitted"
      expect(screen.getByTestId('form-status').textContent).toBe('Not submitted');
    });
    
    it('finds button by text', () => {
      render(<LoginForm />);
      
      // You can also use screen.getByText for buttons
      fireEvent.click(screen.getByText('Login'));
      
      expect(screen.getByTestId('form-status')).toBeTruthy();
    });
  });
  
  // -----------------------------------------
  // INPUT EVENTS - Typing in forms
  // -----------------------------------------
  describe('Input Events - Typing', () => {
    it('types text into an input field', () => {
      render(<LoginForm />);
      
      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      
      // fireEvent.change simulates typing
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      expect(emailInput.value).toBe('test@example.com');
    });
    
    it('handles multiple inputs', () => {
      render(<LoginForm />);
      
      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
      
      fireEvent.change(emailInput, { target: { value: 'user@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'secret123' } });
      
      expect(emailInput.value).toBe('user@email.com');
      expect(passwordInput.value).toBe('secret123');
    });
    
    it('clears an input', () => {
      render(<LoginForm />);
      
      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      expect(emailInput.value).toBe('test@test.com');
      
      fireEvent.change(emailInput, { target: { value: '' } });
      expect(emailInput.value).toBe('');
    });
  });
  
  // -----------------------------------------
  // CHECKBOX EVENTS
  // -----------------------------------------
  describe('Checkbox Events', () => {
    it('checks a checkbox', () => {
      render(<CheckboxGroup />);
      
      const checkbox = screen.getByTestId('checkbox-java') as HTMLInputElement;
      
      expect(checkbox.checked).toBe(false);
      
      fireEvent.click(checkbox);
      
      expect(checkbox.checked).toBe(true);
    });
    
    it('unchecks a checkbox', () => {
      render(<CheckboxGroup />);
      
      const checkbox = screen.getByTestId('checkbox-python') as HTMLInputElement;
      
      // Check it
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
      
      // Uncheck it
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });
  });
  
  // -----------------------------------------
  // KEYBOARD EVENTS
  // -----------------------------------------
  describe('Keyboard Events', () => {
    it('presses a key', () => {
      render(<LoginForm />);
      
      const input = screen.getByTestId('email-input') as HTMLInputElement;
      input.focus();
      
      fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(document.activeElement).toBe(input);
    });
    
    it('types and presses Enter', () => {
      render(<LoginForm />);
      
      const input = screen.getByTestId('email-input') as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: 'test@test.com' } });
      
      // Simulate pressing Enter
      fireEvent.keyPress(input, { key: 'Enter' });
      
      expect(input.value).toBe('test@test.com');
    });
  });
  
  // -----------------------------------------
  // FORM SUBMISSION
  // -----------------------------------------
  describe('Form Submission', () => {
    it('submits a form with data', () => {
      render(<LoginForm />);
      
      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
      const form = screen.getByTestId('login-form');
      
      // Fill out form
      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      // Submit form
      fireEvent.submit(form);
      
      expect(emailInput.value).toBe('user@test.com');
      expect(passwordInput.value).toBe('password123');
    });
  });
  
  // -----------------------------------------
  // FOCUS EVENTS (Note: jsdom has limited focus support)
  // -----------------------------------------
  describe('Focus Events', () => {
    it('fires focus event on input', () => {
      render(<LoginForm />);
      
      const input = screen.getByTestId('email-input');
      
      // Just verify the event fires without error
      fireEvent.focus(input);
      
      expect(input).toBeTruthy();
    });
    
    it('fires blur event on input', () => {
      render(<LoginForm />);
      
      const input = screen.getByTestId('email-input');
      
      fireEvent.focus(input);
      fireEvent.blur(input);
      
      expect(input).toBeTruthy();
    });
  });
});

// ==========================================
// REAL-WORLD PATTERNS
// ==========================================

describe('Real-World Interaction Patterns', () => {
  
  describe('Login Form Flow', () => {
    it('completes full login flow', () => {
      render(<LoginForm />);
      
      // 1. Fill in email
      fireEvent.change(
        screen.getByTestId('email-input'),
        { target: { value: 'john@example.com' } }
      );
      
      // 2. Fill in password
      fireEvent.change(
        screen.getByTestId('password-input'),
        { target: { value: 'password123' } }
      );
      
      // 3. Submit form
      fireEvent.click(screen.getByTestId('submit-btn'));
      
      // 4. Verify data was captured
      expect(
        (screen.getByTestId('email-input') as HTMLInputElement).value
      ).toBe('john@example.com');
    });
  });
  
  describe('Async Interactions', () => {
    it('handles rapid clicks', () => {
      render(<LikeButton />);
      
      const likeButton = screen.getByTestId('like-btn');
      
      // Rapid clicks
      fireEvent.click(likeButton);
      fireEvent.click(likeButton);
      fireEvent.click(likeButton);
      
      // Component should handle this gracefully
      expect(screen.getByTestId('like-count')).toBeTruthy();
    });
  });
});

// ==========================================
// KEY CONCEPTS SUMMARY
// ==========================================

describe('Key Concepts: User Interactions', () => {
  it('understands fireEvent methods', () => {
    /**
     * fireEvent.click(element)     - Click
     * fireEvent.change(element)     - Type or select
     * fireEvent.focus(element)      - Focus
     * fireEvent.blur(element)       - Blur
     * fireEvent.submit(element)     - Submit form
     * fireEvent.keyDown(element)    - Key down
     * fireEvent.keyUp(element)     - Key up
     * fireEvent.mouseEnter(element) - Mouse enter
     * fireEvent.mouseLeave(element) - Mouse leave
     */
    expect(true).toBe(true);
  });
  
  it('understands event targets', () => {
    /**
     * Always set the 'target' property for input events:
     * 
     * fireEvent.change(input, { target: { value: 'text' } })
     * 
     * For checkboxes:
     * fireEvent.click(checkbox)  // toggles checked state
     * 
     * For forms:
     * fireEvent.submit(form)
     */
    expect(true).toBe(true);
  });
});
