import { getDirectiveNames } from '@apollo/client/utilities';
import gql from 'graphql-tag';

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on Restaurant {
    id
    name
    coverImg
    address
    deliveryCost
    deliveryTime
    minimalOrder
    category {
      name
      slug
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

export const USER_RESTAURANTS_FRAGMENT = gql`
  fragment UserRestaurantsParts on User {
    restaurants {
      name
      coverImg
      address
      category {
        name
      }
    }
  }
`;

export const DISH_FRAGMENT = gql`
  fragment DishParts on Dish {
    id
    name
    price
    photo
    description
    options {
      name
      extra
      choices {
        name
        extra
      }
    }
  }
`;
