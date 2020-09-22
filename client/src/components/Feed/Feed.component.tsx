import React from "react";
import { Box, Skeleton } from "@chakra-ui/core";
import { useQuery, gql, useMutation } from "@apollo/client";

import Post from "../Post/Post.component";
import AddPostButton from "../AddButton/AddButton.component";
import RecipeFilter from '../RecipeFilter/RecipeFilter.component'
import { Recipe } from "../../@types/schema";
import { SIMPLE_FLAVOR_QUERY } from "../../graphql/queries";


export const GET_RECIPES = gql`
  query {
    recipesNotArchived(orderBy: published_desc) {
      recipeId
      name
      description
      published
      creator {
        userId
        name
      }
      ingredients {
        Flavor {
          flavorId
          name
        }
        measurement
        amount
      }
      tags {
        tagId
        name
      }
    }
  }
`;


const Feed: React.FC<any> = () => {
  
  const { loading, data, error } = useQuery(GET_RECIPES, {
    pollInterval: 30000,
  });

  const updateFlavorCache = () => {};

    // const getFlavors, { loading, data, error }, ] = useQuery(SIMPLE_FLAVOR_QUERY, { update: updateFlavorCache });

  
  

  const handleEdit = (recipeId: Recipe["recipeId"]): any => {
    alert(recipeId);
  };

  return (
    <Box className="container mx-auto max-w-xl">
      <Box>
        <AddPostButton>Create Recipe</AddPostButton>
        <RecipeFilter />
        <Box>
          {loading && !error && (
            <Box>
              <Skeleton rounded="lg" height="185px" width="100%" mb="4" />
              <Skeleton rounded="lg" height="185px" width="100%" mb="4" />
              <Skeleton rounded="lg" height="185px" width="100%" mb="4" />
              <Skeleton rounded="lg" height="185px" width="100%" mb="4" />
              <Skeleton rounded="lg" height="185px" width="100%" mb="4" />
            </Box>
          )}
          {error && !loading && <p>Error: {JSON.stringify(error)}</p>}
          {data &&
            !loading &&
            !error &&
            data.recipesNotArchived.map((recipe: Recipe) => {
              return (
                <Post
                  key={recipe.recipeId}
                  handleEdit={handleEdit}
                  {...recipe}
                />
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default Feed;
