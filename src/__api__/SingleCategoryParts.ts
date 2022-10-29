/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SingleCategoryParts
// ====================================================

export interface SingleCategoryParts_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface SingleCategoryParts_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: SingleCategoryParts_restaurants_category | null;
}

export interface SingleCategoryParts {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
  restaurants: SingleCategoryParts_restaurants[];
}
