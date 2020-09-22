import React from "react";
import { Box } from "@chakra-ui/core";
import { useQuery, gql } from "@apollo/client";

import Post from "../Post/Post.component";
import AddPostButton from "../AddButton/AddButton.component";
import RecipeFilter from '../RecipeFilter/RecipeFilter.component'
import { Recipe } from "../../@types/schema";


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
    // pollInterval: 15000,
  });

  const handleEdit = (recipeId: Recipe["recipeId"]): any => {
    alert(recipeId);
  };

  return (
    <Box className="container max-w-lg mx-auto rounded-lg mt-6 p-6">
      <AddPostButton>Create Recipe</AddPostButton>
      <RecipeFilter />
      <Box>
        {loading && !error && <p>Loading...</p>}
        {error && !loading && <p>Error: {JSON.stringify(error)}</p>}
        {data &&
          !loading &&
          !error &&
          data.recipesNotArchived.map((recipe: Recipe) => {
            return (
              <Post key={recipe.recipeId} handleEdit={handleEdit} {...recipe} />
            );
          })}
      </Box>
    </Box>
  );
};

export default Feed;
