import '@testing-library/jest-dom';
import { toBeInTheDocument, toHaveTextContent } from '@testing-library/jest-dom/matchers';

expect.extend({ toBeInTheDocument, toHaveTextContent });

export {};
