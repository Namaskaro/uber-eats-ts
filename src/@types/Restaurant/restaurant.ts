import { CoreOutput } from './../Output/output';
import { Category } from './../Category/category';

export type Restaurant = {
  id: number;
  name: string;
  coverImg: string;
  address: string;
  deliveryCost: number | null;
  deliveryTime: string | null;
  minimalOrder: number | null;
  category: Category | null;
};

export type RestaurantInput = {
  restaurantId: number;
};

export type RestaurantOutput = CoreOutput & {
  restaurant: Restaurant | null;
};

export type RestaurantType = {
  restaurant: Restaurant;
};

export type RestaurantTypeVariables = {
  input: RestaurantInput;
};
