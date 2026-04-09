/**
 * LESSON: Design System Tokens - Testing
 * 
 * Now that we've created tokens, let's test them!
 */

import { describe, it, expect } from '@jest/globals';
import { tokens, semanticTokens } from '../theme/tokens';

// ==========================================
// TESTING TOKENS EXIST
// ==========================================

describe('Design System Tokens', () => {
  
  // Test 1: Brand colors exist
  describe('Color Tokens', () => {
    it('has brand colors at all levels', () => {
      expect(tokens.colors.brand[50].value).toBe('#e6f2ff');
      expect(tokens.colors.brand[500].value).toBe('#0066cc');
      expect(tokens.colors.brand[900].value).toBe('#001429');
    });

    it('has neutral/gray colors', () => {
      expect(tokens.colors.neutral[50].value).toBe('#f7fafc');
      expect(tokens.colors.neutral[500].value).toBe('#718096');
      expect(tokens.colors.neutral[900].value).toBe('#171923');
    });

    it('has semantic colors (success, warning, error)', () => {
      expect(tokens.colors.success[500].value).toBe('#38a169');
      expect(tokens.colors.warning[500].value).toBe('#dd6b20');
      expect(tokens.colors.error[500].value).toBe('#e53e3e');
      expect(tokens.colors.info[500].value).toBe('#3182ce');
    });
  });

  // Test 2: Typography tokens exist
  describe('Typography Tokens', () => {
    it('has font sizes', () => {
      expect(tokens.typography.fontSizes.xs.value).toBe('0.75rem');
      expect(tokens.typography.fontSizes.md.value).toBe('1rem');
      expect(tokens.typography.fontSizes['4xl'].value).toBe('2.25rem');
    });

    it('has font weights', () => {
      expect(tokens.typography.fontWeights.normal.value).toBe('400');
      expect(tokens.typography.fontWeights.bold.value).toBe('700');
    });

    it('has line heights', () => {
      expect(tokens.typography.lineHeights.tight.value).toBe('1.25');
      expect(tokens.typography.lineHeights.normal.value).toBe('1.5');
    });
  });

  // Test 3: Spacing tokens exist
  describe('Spacing Tokens', () => {
    it('has spacing values', () => {
      expect(tokens.spacing[0].value).toBe('0px');
      expect(tokens.spacing[1].value).toBe('0.25rem');
      expect(tokens.spacing[4].value).toBe('1rem');
      expect(tokens.spacing[8].value).toBe('2rem');
    });
  });

  // Test 4: Shadow tokens exist
  describe('Shadow Tokens', () => {
    it('has shadow values', () => {
      expect(tokens.shadows.sm.value).toContain('rgba(0, 0, 0, 0.05)');
      expect(tokens.shadows.md.value).toContain('rgba(0, 0, 0, 0.1)');
      expect(tokens.shadows.lg.value).toContain('rgba(0, 0, 0, 0.1)');
    });
  });

  // Test 5: Border tokens exist
  describe('Border Tokens', () => {
    it('has border radius values', () => {
      expect(tokens.borders.radii.none.value).toBe('0px');
      expect(tokens.borders.radii.md.value).toBe('0.25rem');
      expect(tokens.borders.radii.full.value).toBe('9999px');
    });

    it('has border width values', () => {
      expect(tokens.borders.widths[0].value).toBe('0px');
      expect(tokens.borders.widths[1].value).toBe('1px');
    });
  });

  // Test 6: Semantic tokens exist (light/dark mode)
  describe('Semantic Tokens (Light/Dark Mode)', () => {
    it('has background semantic tokens', () => {
      expect(semanticTokens.colors['bg.canvas'].value.base).toBe('{colors.neutral.50}');
      expect(semanticTokens.colors['bg.canvas'].value._dark).toBe('{colors.neutral.900}');
    });

    it('has text semantic tokens', () => {
      expect(semanticTokens.colors['text.primary'].value.base).toBe('{colors.neutral.900}');
      expect(semanticTokens.colors['text.primary'].value._dark).toBe('{colors.neutral.50}');
    });

    it('has border semantic tokens', () => {
      expect(semanticTokens.colors['border.default'].value.base).toBe('{colors.neutral.200}');
    });
  });
});

// ==========================================
// HOW TO USE THESE TOKENS
// ==========================================

describe('Token Usage Examples', () => {
  
  it('shows how to use color tokens', () => {
    // In your component:
    // <Box bg="brand.500">This is brand blue!</Box>
    // <Text color="neutral.900">Dark text</Text>
    // <Box bg="error.500">Error red!</Box>
    
    const brandBlue = tokens.colors.brand[500].value;
    expect(brandBlue).toBe('#0066cc');
  });

  it('shows how to use spacing tokens', () => {
    // In your component:
    // <Box p="4">Padding of 1rem</Box>
    // <Box m="2">Margin of 0.5rem</Box>
    // <Stack gap="4">Gap of 1rem</Stack>
    
    const padding4 = tokens.spacing[4].value;
    expect(padding4).toBe('1rem');
  });

  it('shows how semantic tokens work', () => {
    // Semantic tokens have base and _dark values
    // They automatically switch based on color mode!
    
    const bgCanvasBase = semanticTokens.colors['bg.canvas'].value.base;
    const bgCanvasDark = semanticTokens.colors['bg.canvas'].value._dark;
    
    expect(bgCanvasBase).toBe('{colors.neutral.50}');
    expect(bgCanvasDark).toBe('{colors.neutral.900}');
    
    // When you use bg="bg.canvas" in Chakra:
    // - Light mode: uses {colors.neutral.50}
    // - Dark mode: uses {colors.neutral.900}
  });
});