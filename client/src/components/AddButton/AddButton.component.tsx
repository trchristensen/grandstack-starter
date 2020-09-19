import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/core';
import React from 'react';
import Select from "react-select";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Flavor } from '../../@types/schema';

// import { CREATE_RECIPE_NODE } from '../../graphql/mutations'

interface AddButtonProps {
  children?: React.ReactNode;
}

const options = [
  { value: 'blues', label: 'Blues' },
  { value: 'rock', label: 'Rock' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'orchestra', label: 'Orchestra' } 
];

const SIMPLE_FLAVOR_QUERY = gql`
  query {
    Flavor {
      flavorId
      name
      company {
        name
      }
    }
  }
`;

// interface Flavors extends Array<Flavor>{}
// let Flavors: any = {
//   <string[]> p1: [...]
// }

const AddButton: React.FC<AddButtonProps> = ({children}) => {

  const [flavorsList, setFlavorsList] = React.useState<Flavor[]>();

  const [
    getFlavors,
    { loading, data, error },
  ] = useLazyQuery(SIMPLE_FLAVOR_QUERY, { errorPolicy: "all" });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedOption, setSelectedOption] = React.useState<any>()
  const handleChange = (selectedOption:any) => {

    setSelectedOption({ selectedOption });
    console.log("option selected: ", selectedOption);
  };


  const handleModalOpen = () => {
    onOpen();
    getFlavors();
  }


  React.useEffect(() => {
    console.log(data?.Flavor);

    var result = data?.Flavor.map((flavor:Flavor) => ({
      value: flavor.flavorId,
      label: flavor.name,
    }));
    
    setFlavorsList(result);


  }, [data])

    const link = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );

      if (networkError) console.log(`[Network error]: ${networkError}`);
    });

  return (
    <React.Fragment>
      <Box className="AddPostBtn p-4 shadow rounded flex flex-wrap items-center justify-center mb-4">
        <Button onClick={handleModalOpen} className="w-full flex">
          {children}
        </Button>

        <Button className="block w-full mt-4" onClick={() => getFlavors()}>
          Get Flavors
        </Button>
        {flavorsList && JSON.stringify(flavorsList)}
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="rounded-lg">
          <ModalHeader>Create a new Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <Select
                className="form-control"
                options={flavorsList}
                onChange={handleChange}
              ></Select>
              <Button className="form-control">Create</Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default AddButton
