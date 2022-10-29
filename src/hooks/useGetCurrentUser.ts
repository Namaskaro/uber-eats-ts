import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      role
      email
      verified
      isAuthenticated
    }
  }
`;

export const useMe = () => {
  return useQuery(ME_QUERY);
};
