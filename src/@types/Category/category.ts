import { CategoryInput } from './../../__api__/globalTypes';
import { Restaurant } from './../Restaurant/restaurant';

export type Category = {
  id: number;
  name: string;
  coverImg?: string | null;
  slug: string;
  restaurantCount: number;
  restaurants: CategoryRestaurants[] | null;
};

export type CategoryInput = {
  page?: number | null;
  slug: string;
};

export type CategoryOutput = {
  ok: boolean;
  error: string | null | undefined;
  totalPages: number | null | undefined;
  totalResults: number | null | undefined;
  category: Category | null;
};

export type CategoryName = {
  name: string;
};

export type CategoryRestaurants = {
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: CategoryName | null;
};

export type CategoryType = {
  category: Category;
};

export type CategoryTypeVariables = {
  input: CategoryInput;
};
