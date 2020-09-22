import { useMutation } from '@apollo/client';
import { Box, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useToast } from '@chakra-ui/core';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Recipe } from '../../@types/schema';
import { ARCHIVE_RECIPE } from '../../graphql/mutations';
import { GET_RECIPES } from '../Feed/Feed.component';

const CardMenu: React.FC<any> = ({recipe}, handleEdit) => {

  const toast = useToast()

  const [archive] = useMutation(ARCHIVE_RECIPE, {
    refetchQueries: [{ query: GET_RECIPES }],
    onCompleted: (res) => toast({
           title: "Recipe has been deleted!",
           description: "Your recipe has been deleted.",
           status: "success",
           position: "bottom-right",
           duration: 5000,
           isClosable: true,
         }),
    onError: (err) => console.log(err),
  });

  const handleDelete = (recipeId:Recipe["recipeId"]):any => {
    archive({
      variables: {
        recipeId: recipeId
      }
    });
  }

  return (
    <Menu>
      <MenuButton
        borderRadius={"full"}
        size={"sm"}
        p={"0"}
        as={Button}
        bg={"white"}
      >
        <Box className="text-gray-500" as={BsThreeDotsVertical} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleEdit(recipe.recipeId)}>
          Edit Recipe
        </MenuItem>
        <MenuItem onClick={() => handleDelete(recipe.recipeId)}>
          Delete Recipe
        </MenuItem>

        <MenuDivider />
        <MenuItem>Adapt this</MenuItem>
        <MenuItem>Add to Favorites</MenuItem>
        <MenuItem>Flag</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CardMenu;