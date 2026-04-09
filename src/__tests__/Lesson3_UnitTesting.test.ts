/**
 * LESSON 3: Unit Testing
 * 
 * Unit testing = testing SMALL pieces of code in isolation
 * 
 * These are the simplest tests because:
 * - No React component rendering needed
 * - No mocking needed (usually)
 * - Just call the function and check the result
 */

import { describe, it, expect } from '@jest/globals';
import { add, multiply } from '../utils/math';

// ==========================================
// THE ANATOMY OF A UNIT TEST
// ==========================================

/**
 * Every unit test follows this pattern:
 * 
 * it('should do X when Y', () => {
 *   // 1. Arrange - Set up test data
 *   const input = something;
 *   
 *   // 2. Act - Call the function you're testing
 *   const result = functionUnderTest(input);
 *   
 *   // 3. Assert - Check if result is what you expect
 *   expect(result).toBe(expectedValue);
 * });
 */

describe('Lesson 3: Unit Testing', () => {
  
  // -----------------------------------------
  // BASIC TEST STRUCTURE
  // -----------------------------------------
  describe('add() function', () => {
    it('adds two positive numbers', () => {
      // Arrange
      const a = 2;
      const b = 3;
      
      // Act
      const result = add(a, b);
      
      // Assert
      expect(result).toBe(5);
    });
    
    it('adds negative and positive numbers', () => {
      const result = add(-1, 1);
      expect(result).toBe(0);
    });
    
    it('adds two negative numbers', () => {
      const result = add(-5, -3);
      expect(result).toBe(-8);
    });
    
    it('handles zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });
  });
  
  describe('multiply() function', () => {
    it('multiplies two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });
    
    it('multiplies by zero', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 5)).toBe(0);
    });
    
    it('multiplies by one', () => {
      expect(multiply(7, 1)).toBe(7);
      expect(multiply(1, 7)).toBe(7);
    });
    
    it('handles negative numbers', () => {
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
    });
  });
  
  // -----------------------------------------
  // EDGE CASES
  // -----------------------------------------
  describe('Edge Cases', () => {
    it('handles decimal numbers', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3, 10);
    });
    
    it('handles very large numbers', () => {
      expect(add(1000000, 1000000)).toBe(2000000);
    });
  });
});

// ==========================================
// COMMON MATCHERS FOR UNIT TESTS
// ==========================================

describe('Common Matchers', () => {
  it('toBe - exact equality (uses ===)', () => {
    expect(2 + 2).toBe(4);
    expect('hello').toBe('hello');
  });
  
  it('toEqual - deep equality (for objects/arrays)', () => {
    const obj = { name: 'John', age: 30 };
    expect(obj).toEqual({ name: 'John', age: 30 });
  });
  
  it('toBeTruthy and toBeFalsy', () => {
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
    expect('').toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
  });
  
  it('toBeNull', () => {
    const empty = null;
    expect(empty).toBeNull();
  });
  
  it('toBeUndefined', () => {
    const notDefined = undefined;
    expect(notDefined).toBeUndefined();
  });
  
  it('toBeDefined', () => {
    const defined = 'something';
    expect(defined).toBeDefined();
  });
  
  it('toBeGreaterThan, toBeLessThan', () => {
    expect(10).toBeGreaterThan(5);
    expect(5).toBeLessThan(10);
  });
  
  it('toBeCloseTo - for floating point', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
  });
  
  it('toContain - for arrays/strings', () => {
    expect([1, 2, 3]).toContain(2);
    expect('hello world').toContain('world');
  });
  
  it('toThrow - for functions that throw', () => {
    const badFunction = () => {
      throw new Error('Something went wrong');
    };
    
    expect(badFunction).toThrow();
    expect(badFunction).toThrow('Something went wrong');
  });
  
  it('toHaveLength - for arrays/strings', () => {
    expect([1, 2, 3]).toHaveLength(3);
    expect('hello').toHaveLength(5);
  });
});
