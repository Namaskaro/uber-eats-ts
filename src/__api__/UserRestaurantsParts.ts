/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserRestaurantsParts
// ====================================================

export interface UserRestaurantsParts_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface UserRestaurantsParts_restaurants {
  __typename: "Restaurant";
  name: string;
  coverImg: string;
  address: string;
  category: UserRestaurantsParts_restaurants_category | null;
}

export interface UserRestaurantsParts {
  __typename: "User";
  restaurants: UserRestaurantsParts_restaurants[];
}
