/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyRestaurants
// ====================================================

export interface getMyRestaurants_myRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface getMyRestaurants_myRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  deliveryCost: number | null;
  deliveryTime: string | null;
  minimalOrder: number | null;
  category: getMyRestaurants_myRestaurants_restaurants_category | null;
}

export interface getMyRestaurants_myRestaurants {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  error: string | null;
  restaurants: getMyRestaurants_myRestaurants_restaurants[];
}

export interface getMyRestaurants {
  myRestaurants: getMyRestaurants_myRestaurants;
}
