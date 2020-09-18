import React from "react";
import {
  Box,
  Heading,
  Flex,
  Link as CLink,
  useColorMode,
  IconButton,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";

const MenuItems: React.FC<any> = ({ children }) => (
  <CLink mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </CLink>
);


const Navbar: React.FC<any> = (props) => {

  const { colorMode, toggleColorMode } = useColorMode();  

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      borderBottom="1px solid black"
      bg={colorMode === "light" ? "gray.900" : "teal.500"}
      color={colorMode === "light" ? "teal.300" : "white"}
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          The Next Project
        </Heading>
      </Flex>

      <Box
        display="flex"
        width="auto"
        alignItems="center"
        flexGrow={1}
        color={colorMode === "light" ? "teal.300" : "white"}
      >
        <MenuItems>
          <Link to="/">Home</Link>
        </MenuItems>
        <MenuItems>Blogs</MenuItems>
        <MenuItems>
          <Link to="/dashboard">Dashboard</Link>
        </MenuItems>
        <MenuItems>Contact</MenuItems>
      </Box>
      <Box display="block" mt={{ base: 4, md: 0 }}>
        <IconButton
          bg="transparent"
          aria-label="toggle color mode"
          icon={colorMode === "light" ? "moon" : "sun"}
          onClick={toggleColorMode}
          color="white"
        />
      </Box>
    </Flex>
  );
};

export default Navbar;
