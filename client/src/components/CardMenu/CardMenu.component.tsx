import { Box, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/core';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs'

const CardMenu = () => {
  return (
    <Menu>
      <MenuButton borderRadius={'full'} size={"sm"} p={'0'} as={Button}>
        <Box as={BsThreeDotsVertical} />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem>Payments </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default CardMenu;