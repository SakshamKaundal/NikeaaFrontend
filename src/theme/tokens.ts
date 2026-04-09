/**
 * Design System Tokens - The "Paint Box" for our app!
 * 
 * Think of this like having all your colors, sizes, and styles
 * in one organized box. Instead of remembering "#0066cc" everywhere,
 * we just say "brand.500"!
 */

export const tokens = {
  // ==========================================
  // 1. COLOR TOKENS - All the colors we use
  // ==========================================
  colors: {
    // Brand colors - our main app colors
    brand: {
      50: { value: '#e6f2ff' },
      100: { value: '#b3d9ff' },
      200: { value: '#80bfff' },
      300: { value: '#4da6ff' },
      400: { value: '#1a8cff' },
      500: { value: '#0066cc' },  // Main brand color!
      600: { value: '#0052a3' },
      700: { value: '#003d7a' },
      800: { value: '#002952' },
      900: { value: '#001429' },
    },
    
    // Neutral/Gray colors - for text and backgrounds
    neutral: {
      50: { value: '#f7fafc' },
      100: { value: '#edf2f7' },
      200: { value: '#e2e8f0' },
      300: { value: '#cbd5e0' },
      400: { value: '#a0aec0' },
      500: { value: '#718096' },  // Default gray
      600: { value: '#4a5568' },
      700: { value: '#2d3748' },
      800: { value: '#1a202c' },
      900: { value: '#171923' },
    },
    
    // Semantic colors - what colors MEAN
    success: {
      500: { value: '#38a169' },
      600: { value: '#2f855a' },
    },
    warning: {
      500: { value: '#dd6b20' },
      600: { value: '#c05621' },
    },
    error: {
      500: { value: '#e53e3e' },
      600: { value: '#c53030' },
    },
    info: {
      500: { value: '#3182ce' },
      600: { value: '#2b6cb0' },
    },
  },

  // ==========================================
  // 2. TYPOGRAPHY TOKENS - Text styles
  // ==========================================
  typography: {
    fonts: {
      heading: { value: 'Inter, system-ui, sans-serif' },
      body: { value: 'Inter, system-ui, sans-serif' },
      mono: { value: 'Fira Code, monospace' },
    },
    fontSizes: {
      xs: { value: '0.75rem' },    // 12px
      sm: { value: '0.875rem' },   // 14px
      md: { value: '1rem' },       // 16px - DEFAULT
      lg: { value: '1.125rem' },   // 18px
      xl: { value: '1.25rem' },    // 20px
      '2xl': { value: '1.5rem' },  // 24px
      '3xl': { value: '1.875rem' },// 30px
      '4xl': { value: '2.25rem' }, // 36px
    },
    fontWeights: {
      normal: { value: '400' },
      medium: { value: '500' },
      semibold: { value: '600' },
      bold: { value: '700' },
    },
    lineHeights: {
      tight: { value: '1.25' },
      normal: { value: '1.5' },
      relaxed: { value: '1.75' },
    },
  },

  // ==========================================
  // 3. SPACING TOKENS - How much space?
  // ==========================================
  spacing: {
    0: { value: '0px' },
    0.5: { value: '0.125rem' },  // 2px
    1: { value: '0.25rem' },    // 4px
    2: { value: '0.5rem' },      // 8px
    3: { value: '0.75rem' },     // 12px
    4: { value: '1rem' },        // 16px - DEFAULT
    5: { value: '1.25rem' },     // 20px
    6: { value: '1.5rem' },      // 24px
    8: { value: '2rem' },        // 32px
    10: { value: '2.5rem' },     // 40px
    12: { value: '3rem' },       // 48px
    16: { value: '4rem' },       // 64px
  },

  // ==========================================
  // 4. SHADOW TOKENS - Making things pop!
  // ==========================================
  shadows: {
    sm: { value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
    md: { value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
    lg: { value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
    xl: { value: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
    '2xl': { value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
  },

  // ==========================================
  // 5. BORDER TOKENS - Lines around things
  // ==========================================
  borders: {
    widths: {
      0: { value: '0px' },
      1: { value: '1px' },
      2: { value: '2px' },
      4: { value: '4px' },
    },
    radii: {
      none: { value: '0px' },
      sm: { value: '0.125rem' },   // 2px
      md: { value: '0.25rem' },    // 4px
      lg: { value: '0.5rem' },     // 8px
      xl: { value: '0.75rem' },    // 12px
      '2xl': { value: '1rem' },    // 16px
      full: { value: '9999px' },   // Circle!
    },
  },
};

// ==========================================
// SEMANTIC TOKENS - Smart colors that change!
// ==========================================
export const semanticTokens = {
  colors: {
    // Background colors
    'bg.canvas': {
      value: { base: '{colors.neutral.50}', _dark: '{colors.neutral.900}' },
    },
    'bg.surface': {
      value: { base: 'white', _dark: '{colors.neutral.800}' },
    },
    'bg.muted': {
      value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.700}' },
    },
    
    // Text colors
    'text.primary': {
      value: { base: '{colors.neutral.900}', _dark: '{colors.neutral.50}' },
    },
    'text.secondary': {
      value: { base: '{colors.neutral.600}', _dark: '{colors.neutral.400}' },
    },
    'text.muted': {
      value: { base: '{colors.neutral.500}', _dark: '{colors.neutral.500}' },
    },
    
    // Border colors
    'border.default': {
      value: { base: '{colors.neutral.200}', _dark: '{colors.neutral.700}' },
    },
    'border.muted': {
      value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.800}' },
    },
    
    // Brand colors for specific uses
    'primary.bg': {
      value: '{colors.brand.50}',
    },
    'primary.text': {
      value: '{colors.brand.700}',
    },
    'primary.border': {
      value: '{colors.brand.200}',
    },
  },
};

export default tokens;