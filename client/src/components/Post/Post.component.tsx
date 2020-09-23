import React from "react";
import {
  Box,
  Text,
  Avatar,
  Stack,
  Button,
  Tooltip,
  Tag,
  useToast,
  Collapse,
} from "@chakra-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import { BiComment, BiLike } from "react-icons/bi";
import { Recipe, ITag, _RecipeIngredients, Comment } from "../../@types/schema";
import CardMenu from "../CardMenu/CardMenu.component";
import CommentBox from "../CommentBox/CommentBox.component";
import { useQuery } from "@apollo/client";
import { GET_RECIPE_COMMENTS_AND_REPLIES } from "../../graphql/queries";

const Post: React.FC<any> = (recipe: Recipe, handleEdit) => {
  const ingredientPercentage = recipe.ingredients?.reduce(
    (total: number, currentValue: any) => {
      return total + parseInt(currentValue.amount);
    },
    0
  );
  const [moreInfoShow, setMoreInfoShow] = React.useState(false);
  const [commentsShow, setCommentsShow] = React.useState(false);
  const commentQuery = useQuery(GET_RECIPE_COMMENTS_AND_REPLIES, {
    variables: {
      recipeId: recipe.recipeId,
    },
  });
  const handleToggle = () => setMoreInfoShow(!moreInfoShow);
  const handleExpandComments = () => {
    // new query to load comments for single recipe. then add to cache object (local state)
    console.log(commentQuery.data.Recipe[0].comments)

    // open comments box
    setCommentsShow(!commentsShow);
  }
  

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
              {recipe.creator.name}
              <Text className="text-gray-600">
                <span className="ml-1">{" • "}</span>{" "}
                {moment(recipe.published).fromNow()}{" "}
                {recipe.isArchived && ` - Archived`}
              </Text>
            </Box>
          </Box>
        </Box>
        <CardMenu recipe={recipe} handleEdit={handleEdit} />
      </Box>
      <Box className="recipeCard_content">
        <Box className="mt-2 mb-3">
          <Collapse startingHeight={24} isOpen={moreInfoShow}>
            <Text>{recipe.description}</Text>
            <Box>Flavor details here</Box>
          </Collapse>

          <Text
            className="text-right block"
            as="span"
            fontSize="sm"
            onClick={handleToggle}
            mt="2"
            cursor="pointer"
            color="gray.500"
          >
            Show {moreInfoShow ? "Less" : "More"}
          </Text>
        </Box>
        <Box>
          <Stack
            className="w-full border rounded-lg overflow-hidden bg-gray-200 ingredientsBar"
            spacing={0}
            isInline
          >
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient: any) => {
                return (
                  <Box
                    style={{ width: `${ingredient.amount}%` }}
                    className="ingredientsBar__ingredient text-gray-700 font-semibold text-xs flex justify-center items-center flex-row border-r border-gray-200"
                  >
                    <Tooltip
                      aria-label="tooltip"
                      label={`${ingredient.Flavor.name} - ${ingredient.amount}
                      ${ingredient.measurement}`}
                      placement="bottom"
                    >
                      <div
                        className="w-full text-center relative block"
                        style={{ height: "10px" }}
                      ></div>
                    </Tooltip>
                  </Box>
                );
              })}
          </Stack>
        </Box>
        <Box className="recipeCard__tags flex w-full">
          <Stack className="w-full mt-3" isInline>
            {recipe.tags &&
              recipe.tags.map((tag: any) => (
                <Tag style={{ fontSize: "12px" }} size={"sm"}>
                  {tag.name}
                </Tag>
              ))}
          </Stack>
        </Box>
        <Box className="recipeCard__cta-count w-full flex justify-between mt-2 text-sm text-gray-600 px-1">
          <Box># likes</Box>
          {recipe.comments && recipe.comments.length > 0 ? (
            <Box className="cursor-pointer" onClick={handleExpandComments}>
              {recipe.comments.length + " comments"}
            </Box>
          ) : null}
        </Box>
        <Box className="recipeCard__cta w-full border-t border-b border-gray-300">
          <Box className="flex flex-row">
            <Box className="w-1/2 text-center">
              <Button bg="white" size="sm" py="1" className="block w-full">
                <Box className="mr-1" as={BiLike} />
                Like
              </Button>
            </Box>
            <Box className="w-1/2 text-center">
              <Button
                onClick={handleExpandComments}
                bg="white"
                size="sm"
                py="1"
                className="block w-full"
              >
                <Box className="mr-1" as={BiComment} />
                Comment
              </Button>
            </Box>
          </Box>
          <Collapse
            mt="0"
            pt="4"
            pb="4"
            className="border-t border-gray-300"
            isOpen={commentsShow}
          >
            <CommentBox recipe={recipe} />
            {commentQuery.data &&
              !commentQuery.error &&
              commentQuery.data.Recipe[0].comments.map((comment:Comment) => (
                <Box
                  className="p-2 rounded-lg flex items-start w-full"
                  key={comment.commentId}
                >
                  <Box>
                    <Avatar size="sm" />
                  </Box>
                  <Box className="pl-1 w-full">
                    <Box className="flex flex-col rounded-lg bg-gray-200 p-1 pl-2 pr-2 text-sm w-full">
                      <Text className="font-semibold leading-tight">
                        {comment.author.name}
                      </Text>
                      <Text className="leading-tight">{comment.text}</Text>
                    </Box>
                    <Text className="text-xs ml-1">
                      {moment(comment.published).fromNow()}
                    </Text>
                  </Box>
                </Box>
              ))}
           
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
