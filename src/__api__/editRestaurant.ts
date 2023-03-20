/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editRestaurant
// ====================================================

export interface editRestaurant_editRestaurant {
  __typename: "EditRestaurantOutput";
  ok: boolean;
  error: string | null;
}

export interface editRestaurant {
  editRestaurant: editRestaurant_editRestaurant;
}

export interface editRestaurantVariables {
  name: string;
  coverImg: string;
  address: string;
  categoryName: string;
  minimalOrder: number;
  deliveryCost: number;
  deliveryTime: string;
  restaurantId: number;
}
