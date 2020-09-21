import { gql } from "@apollo/client";

export const SIMPLE_FLAVOR_QUERY = gql`
  query {
    Flavor {
      flavorId
      name
      company {
        name
      }
    }
  }
`;