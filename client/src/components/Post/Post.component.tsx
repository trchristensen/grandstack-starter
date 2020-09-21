import React from 'react';
import {
  Box,
  Text,
  Avatar,
  Stack,
  Button,
} from "@chakra-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import { BiComment, BiLike } from "react-icons/bi"; 
import { Recipe, _RecipeIngredients } from '../../@types/schema';



const Post: React.FC<Recipe> = ({...recipe}) => {

  return (
    <Box className="recipeCard mb-4 px-4 py-4 shadow rounded-lg">
      <Box className="recipeCard__header flex flex-row items-center">
        <Avatar bg="gray.500" size="sm" name="author name" src=""></Avatar>
        <Box className="recipeCard_header-info flex flex-col px-2">
          <Text className="text-lg leading-tight font-bold">{recipe.name}</Text>
          <Box className="recipeCard_header-info-details flex flex-wrap flex-row align-end text-sm">
            <Link to="#">by {recipe.creator.name}</Link>
            <Text className="text-gray-600">
              <span className="ml-1">{" • "}</span>{" "}
              {moment(recipe.published.formatted).fromNow()}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box className="recipeCard_content">
        <Box className="mt-2 mb-3">
          <Text>{recipe.description}</Text>
        </Box>
        <Box>
          <Stack className="w-full" isInline>
            {
              recipe.ingredients &&
              recipe.ingredients.map((ingredient) => {
                return (
                  <Box className="bg-gray-100 text-gray-700 font-semibold p-1 rounded text-xs flex flex-row">
                    {JSON.stringify(ingredient)}
                    <span className="mr-1" role="img" aria-label="emoji">
                      🍰
                    </span>
                    <Text>{ingredient.Flavor.name} - {ingredient.amount} ({ingredient.measurement}).</Text>
                  </Box>
                );
              })
            }
          </Stack>
        </Box>
        <Box className="recipeCard__cta flex flex-row w-full border-t border-b border-gray-300 mt-2">
          <Box className="w-1/2 text-center">
            <Button bg="white" size="sm" py="1" className="block w-full">
              <Box className="mr-1" as={BiLike} />
              Like
            </Button>
          </Box>
          <Box className="w-1/2 text-center">
            <Button bg="white" size="sm" py="1" className="block w-full">
              <Box className="mr-1" as={BiComment} />
              Comment
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Post