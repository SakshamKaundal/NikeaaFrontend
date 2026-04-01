# Nikyaa Store - Frontend

A modern React e-commerce frontend built with TypeScript, Vite, and Apollo Client.

## Features

- **Product Listing** - Browse products with grid view
- **Search & Filter** - Search by name/description, filter by price range and stock status
- **Product Details** - View full product information
- **Shopping Cart** - Add/remove items, update quantities, view totals
- **Real-time Updates** - Apollo Client caches and refetches data automatically

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- Apollo Client 3 (GraphQL)
- Lucide React (icons)
- CSS (custom styling)

## Getting Started

### Prerequisites

- Node.js 18+
- Running backend server (see backend/README.md)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at http://localhost:5173

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── lib/
│   ├── apollo.ts      # Apollo Client configuration
│   └── queries.ts     # GraphQL queries & mutations
├── components/
│   ├── Navbar.tsx     # Navigation with cart indicator
│   ├── ProductList.tsx # Product grid with search/filter
│   ├── ProductCard.tsx # Individual product card
│   ├── ProductDetail.tsx # Full product view
│   └── Cart.tsx       # Shopping cart sidebar
├── App.tsx            # Main app component
├── App.css            # Component styles
└── index.css          # Global styles
```

## API Connection

The frontend connects to the GraphQL backend at `http://localhost:3000/graphql`. Update the URI in `src/lib/apollo.ts` if your backend runs on a different address.
