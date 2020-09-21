import React from "react";
import {
  Box,
  Text,
  Avatar,
  Stack,
  Button,
  Tooltip,
  Tag,
} from "@chakra-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import { BiComment, BiLike } from "react-icons/bi";
import { Recipe, ITag, _RecipeIngredients } from "../../@types/schema";
import CardMenu from "../CardMenu/CardMenu.component";

const Post: React.FC<Recipe> = ({ ...recipe }) => {
  return (
    <Box className="recipeCard bg-white mb-4 px-4 py-4 shadow rounded-lg">
      <Box className="recipeCard__header flex flex-row items-start justify-between">
        <Box className="w-full flex-row flex">
          <Avatar bg="gray.500" size="sm" name="author name" src=""></Avatar>
          <Box className="recipeCard_header-info flex flex-col px-2">
            <Text className="text-lg leading-tight font-bold">
              {recipe.name}
            </Text>
            <Box className="recipeCard_header-info-details flex flex-wrap flex-row align-end text-sm">
              <Link to="#">by {recipe.creator.name}</Link>
              <Text className="text-gray-600">
                <span className="ml-1">{" • "}</span>{" "}
                {moment(recipe.published).fromNow()}
              </Text>
            </Box>
          </Box>
        </Box>
        <CardMenu />
      </Box>
      <Box className="recipeCard_content">
        <Box className="mt-2 mb-3">
          <Text>{recipe.description}</Text>
        </Box>
        <Box>
          <Stack
            className="w-full border rounded-lg overflow-hidden bg-gray-200 ingredientsBar"
            spacing={0}
            isInline
          >
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient) => {
                return (
                  <Box
                    style={{ width: `${ingredient.amount}%` }}
                    className="ingredientsBar__ingredient bg-gray-500 text-gray-700 font-semibold text-xs flex justify-center items-center flex-row"
                  >
                    <Tooltip
                      aria-label="tooltip"
                      label={`${ingredient.Flavor.name} - ${ingredient.amount}(
                      ${ingredient.measurement})`}
                      placement="bottom"
                    >
                      <span
                        className="w-full text-center relative block"
                        role="img"
                        aria-label="emoji"
                      >
                        🍰
                      </span>
                    </Tooltip>
                  </Box>
                );
              })}
          </Stack>
        </Box>
        <Box className="recipeCard__tags flex w-full">
          <Stack className="w-full mt-3" isInline>
            {recipe.tags &&
              recipe.tags.map((tag) => (
                <Tag style={{ fontSize: "12px" }} size={"sm"}>
                  {tag.name}
                </Tag>
              ))}
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
};

export default Post;
