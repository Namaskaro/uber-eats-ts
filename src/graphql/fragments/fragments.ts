import gql from 'graphql-tag';

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on Restaurant {
    id
    name
    coverImg
    address
    category {
      name
    }
  }
`;

export const SINGLE_CATEGORY_FRAGMENT = gql`
  fragment SingleCategoryParts on Category {
    id
    name
    coverImg
    slug
    restaurantCount
    restaurants {
      id
      name
      coverImg
      address
      category {
        name
      }
    }
  }
`;

// export const IS_LOGGED_IN = gql`
//  fragment IsLoggedInParts on User {

//  }

// `
