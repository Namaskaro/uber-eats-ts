import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import meQuery from '../graphql/queries/meQuery.gql';

// const ME_QUERY = gql`
//   query meQuery {
//     me {
//       id
//       role
//       email
//       verified
//       isAuthenticated
//     }
//   }
// `;

export const useMe = () => {
  return useQuery(meQuery);
};
