/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createRestaurantByOwner
// ====================================================

export interface createRestaurantByOwner_createRestaurant {
  __typename: "CreateRestaurantOutput";
  ok: boolean;
  error: string | null;
}

export interface createRestaurantByOwner {
  createRestaurant: createRestaurantByOwner_createRestaurant;
}

export interface createRestaurantByOwnerVariables {
  name: string;
  coverImg: string;
  address: string;
  categoryName: string;
  minimalOrder: number;
  deliveryCost: number;
  deliveryTime: string;
}
