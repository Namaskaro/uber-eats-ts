import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import getMyRestaurants from '../graphql/queries/getMyRestaurants.gql';

export const useMyRestaurants = () => {
  return useQuery(getMyRestaurants);
};
