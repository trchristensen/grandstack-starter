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

export const GET_RECIPE = gql`
  query($recipeId: ID) {
    Recipe(recipeId: $recipeId, orderBy: published_desc) {
      recipeId
      name
      description
      published
      ingredients {
        amount
        measurement
        Flavor {
          flavorId
          name
        }
      }
      tags {
        tagId
        name
      }
      isArchived
      # comments {
      #   commentId
      #   published
      #   text
      #   author {
      #     userId
      #     name
      #   }
      # }
      creator {
        userId
        name
      }
    }
  }
`;

export const GET_RECIPE_COMMENTS_AND_REPLIES = gql`
  query($recipeId: ID!) {
    Recipe(recipeId: $recipeId) {
      comments {
        commentId
        published
        author {
          userId
          name
        }
        text
        replies {
          replyId
          published
          text
          author {
            userId
            name
          }
          replies {
            replyId
            text
            author {
              userId
              name
            }
          }
        }
      }
    }
  }
`;
