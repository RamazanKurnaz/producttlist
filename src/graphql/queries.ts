import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      items {
        id
        title
        description
        price
        category
        brand
        thumbnail
        rating
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
      price
      category
      brand
      thumbnail
      rating
    }
  }
`;
