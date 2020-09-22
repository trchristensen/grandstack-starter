import { useMutation } from '@apollo/client';
import { Box, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/core';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Recipe } from '../../@types/schema';
import { ARCHIVE_RECIPE } from '../../graphql/mutations';

const CardMenu: React.FC<any> = ({recipe}, handleEdit) => {

  const [archive] = useMutation(ARCHIVE_RECIPE, {
    onCompleted: (res) => console.log('Recipe has been archived!', res),
    onError: (err) => console.log(err)
  })

  const handleDelete = (recipeId:Recipe["recipeId"]):any => {
    archive({
      variables: {
        recipeId: recipeId
      }
    });
  }

  return (
    <Menu>
      <MenuButton borderRadius={"full"} size={"sm"} p={"0"} as={Button} bg={'white'}>
        <Box className="text-gray-500" as={BsThreeDotsVertical} />
      </MenuButton>
      <MenuList>
        
          <MenuItem onClick={() => handleEdit(recipe.recipeId)}>
            Edit Recipe
          </MenuItem>
          <MenuItem onClick={() => handleDelete(recipe.recipeId)}>Delete Recipe</MenuItem>

        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Flag</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default CardMenu;