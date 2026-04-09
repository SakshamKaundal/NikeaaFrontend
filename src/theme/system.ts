/**
 * Chakra UI v3 System Configuration
 * 
 * This brings together our tokens into a system that Chakra can use!
 * Think of it like: "Here's my paint box, now let's use it to paint!"
 */

import { createSystem, defaultConfig } from '@chakra-ui/react';
import { tokens, semanticTokens } from './tokens';

// Create our custom system with our tokens
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: tokens,
    semanticTokens: semanticTokens,
  },
});

export default system;