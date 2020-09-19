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
      bg={colorMode === "light" ? "gray.800" : "gray.200"}
      color={colorMode === "light" ? "gray.200" : "gray.800"}
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          JuiceSauce
        </Heading>
      </Flex>

      <Box
        display="flex"
        width="auto"
        alignItems="center"
        flexGrow={1}
        color={colorMode === "light" ? "gray.200" : "gray.800"}
      >
       
          <Link to="/">Home</Link>
       
        <MenuItems>Blogs</MenuItems>
        
          <Link to="/dashboard">Dashboard</Link>
       
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
