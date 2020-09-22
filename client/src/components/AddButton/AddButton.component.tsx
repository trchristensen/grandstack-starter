import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
  useToast
} from "@chakra-ui/core";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DateTime, Flavor } from "../../@types/schema";
import { SIMPLE_FLAVOR_QUERY } from "../../graphql/queries";
import { CREATE_RECIPE_WITH_INGREDIENTS_AND_CREATOR } from "../../graphql/mutations";
import { GET_RECIPES } from "../Feed/Feed.component";
import { CreateRandomID } from "../../helpers/functions";
interface AddButtonProps {
  children?: React.ReactNode;
}


const AddButton: React.FC<AddButtonProps> = ({ children }) => {
  const animatedComponents = makeAnimated();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleModalOpen = () => {
    onOpen();
    getFlavors();
  };

  const [
    getFlavors,
    { loading, data, error },
  ] = useLazyQuery(SIMPLE_FLAVOR_QUERY, { errorPolicy: "all" });

  const [createRecipe] = useMutation(
    CREATE_RECIPE_WITH_INGREDIENTS_AND_CREATOR,
    {
      // update(cache, { data }) {
      //   const newRecipeFromResponse = data?.createRecipeWithIngredients;
      //   console.log("newRecipeFromResponse_: ", newRecipeFromResponse);

      //   const existingRecipes: any = cache.readQuery({
      //     query: GET_RECIPES,
      //   });

      //   cache.writeQuery({
      //     query: GET_RECIPES,
      //     data: {
      //       recipes: existingRecipes?.recipesNotArchived.concat(
      //         newRecipeFromResponse
      //       ),
      //     },
      //   });
      // },

      refetchQueries: [{query: GET_RECIPES}],
      onCompleted: (res) => {
        console.log(`Recipe ${name?.toUpperCase} has been created!`);
        setName("");
        setDescription("");
        setSelectedOption({});
        onClose();
         toast({
           title: "Recipe created!",
           description: "Your recipe has been created.",
           status: "success",
           position: "bottom-right",
           duration: 5000,
           isClosable: true,
         });
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const [flavorsList, setFlavorsList] = React.useState<Flavor[]>();
  const [selectedOption, setSelectedOption] = React.useState<any>();
  const [createRecipeInfo, setCreateRecipeInfo] = React.useState();
  const [measurement, setMeasurement] = React.useState<string>("g");
  const [name, setName] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();

  const handleChange = (selectedOption: any) => {
    setSelectedOption({ selectedOption });
  };

  const handleCreateRecipe = (e: any) => {
    e.preventDefault();
    const currentDateTime = new Date().toISOString();
    // WE NEED SOME VALIDATION RIGHT HERE.

    const recipeInfo = [...selectedOption.selectedOption];

    const newFlavorInfo: any = recipeInfo.map((flavor) => {
      const qty = (document.getElementById(
        `${flavor.value}`
      ) as HTMLInputElement).value;

      let rObj: {
        amount?: number;
        measurement?: string;
        flavorId?: string;
      } = {};
      rObj["amount"] = parseInt(qty);
      rObj["measurement"] = measurement;
      rObj["flavorId"] = flavor.value;
      return rObj;
    });

    type recipePayload = {
      recipeId: string;
      name: string | any;
      description: string | any;
      userId: string;
      published: string;
      ingredients: [any];
      isArchived: boolean;
    };

    const createRecipePayload: recipePayload = {
      recipeId: CreateRandomID(32),
      name: name,
      description: description,
      published: currentDateTime,
      userId: "84eb9ea8-d0ed-4d76-a121-2b4855c738dd",
      ingredients: newFlavorInfo,
      isArchived: false,
    };

    createRecipe({ variables: createRecipePayload });
  };

  React.useEffect(() => {
    var result = data?.Flavor.map((flavor: Flavor) => ({
      value: flavor.flavorId,
      label: flavor.name,
    }));
    setFlavorsList(result);
  }, [data]);

  return (
    <React.Fragment>
      <Box className="AddPostBtn bg-white p-4 shadow rounded flex flex-wrap items-center justify-center mb-4">
        <Button
          bg={"gray.900"}
          color={"gray.100"}
          onClick={handleModalOpen}
          className="w-full flex"
        >
          {children}
        </Button>
      </Box>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="rounded-lg">
          <ModalHeader>Create a new Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form
              id="recipeForm"
              onSubmit={(e: React.FormEvent) => handleCreateRecipe(e)}
            >
              <FormControl className="mb-3" isRequired>
                <FormLabel htmlFor="fname">Recipe Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  id="recipeName"
                  placeholder="Recipe name"
                />
              </FormControl>
              <FormControl className="mb-3">
                <Textarea
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Here is a sample placeholder"
                  size="sm"
                />
              </FormControl>
              <FormControl className="mb-3" as="fieldset">
                <FormLabel as="legend">Flavor Unit of Measurement</FormLabel>
                <RadioGroup
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMeasurement(e.target.value)
                  }
                  value={measurement}
                  className="flex flex-wrap justify-normal"
                  defaultValue="%"
                >
                  <Radio className="px-2" value="%">
                    %
                  </Radio>
                  <Radio className="px-2" value="g">
                    grams
                  </Radio>
                  <Radio className="px-2 pl-0" value="drops">
                    Drops
                  </Radio>
                  <Radio className="px-2" value="ml">
                    mL
                  </Radio>
                </RadioGroup>
              </FormControl>
              <FormControl className="mb-3" isRequired>
                <Select
                  isMulti
                  name="colors"
                  options={flavorsList}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleChange}
                />
                {selectedOption?.selectedOption &&
                  selectedOption?.selectedOption.map((row: any) => (
                    <Box
                      className="flavorQty my-8 p-2 py-4 border rounded bg-gray-200"
                      key={row.value}
                    >
                      <Box className="mb-2 font-semibold">{row.label}</Box>
                      <Box>
                        <label>Quantity ({measurement})</label>
                        <NumberInput size="sm">
                          <NumberInputField
                            className="flavorQty__input"
                            id={row.value}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
                    </Box>
                  ))}
              </FormControl>
              <Button type="submit" variantColor="blue" mr={3}>
                Create Recipe
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default AddButton;
