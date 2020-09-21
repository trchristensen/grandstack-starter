import React from "react";
import { Box, Heading, Flex, Link as CLink, IconButton } from "@chakra-ui/core";
import { Link } from "react-router-dom";

const MenuItems: React.FC<any> = ({ children }) => (
  <CLink mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </CLink>
);

const Navbar: React.FC<any> = (props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          JuiceSauce
        </Heading>
      </Flex>

      <Box display="flex" width="auto" alignItems="center" flexGrow={1}>
        <Link className="mr-3" to="/">Home</Link>
        {/* <Link className="mr-3" to="#">Blogs</Link> */}
        <Link className="mr-3" to="/dashboard">Dashboard</Link>
        {/* <Link className="mr-3" to="#">Contact</Link> */}
      </Box>
      <Box display="block" mt={{ base: 4, md: 0 }}></Box>
    </Flex>
  );
};

export default Navbar;
