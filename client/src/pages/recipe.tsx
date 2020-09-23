import React from "react";
import { Box, Text } from "@chakra-ui/core";
import { useParams } from "react-router";
import Post from "../components/Post/Post.component";
import { useQuery, gql } from "@apollo/client";

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
      comments {
        commentId
        published
        text
        author {
          userId
          name
        }
      }
      creator {
        userId
        name
      }
    }
  }
`;

const SingleRecipe: React.FC<any> = () => {
  let { id } = useParams();

  const { loading, data, error } = useQuery(GET_RECIPE, {
    variables: {
      recipeId: id,
    },
  });

  return <>{data &&
  <Post recipe={data.Recipe[0]} />
  // JSON.stringify(data.Recipe[0])
  }</>;
};
export default SingleRecipe;
