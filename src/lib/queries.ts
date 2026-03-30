import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      stock
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      stock
      createdAt
      updatedAt
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    cart {
      id
      cartItems {
        id
        quantity
        subtotal
        product {
          id
          name
          price
          stock
        }
      }
      total
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!) {
    addToCart(productId: $productId) {
      cartItem {
        id
        quantity
        subtotal
        product {
          id
          name
          price
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($id: ID!, $quantity: Int!) {
    updateCartItem(id: $id, quantity: $quantity) {
      cartItem {
        id
        quantity
        subtotal
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($id: ID!) {
    removeFromCart(id: $id) {
      success
    }
  }
`;

export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart {
      success
    }
  }
`;
