import { useLazyQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import searchRestaurantQuery from '../graphql/queries/searchRestaurantQuery.gql';

export const useSearchRestaurant = () => {
  return useLazyQuery(searchRestaurantQuery);
};
