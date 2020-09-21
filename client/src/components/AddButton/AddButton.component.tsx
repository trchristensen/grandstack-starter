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
  useDisclosure,
} from "@chakra-ui/core";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Flavor } from "../../@types/schema";
import { SIMPLE_FLAVOR_QUERY } from "../../graphql/queries";
import { CREATE_RECIPE_NODE, CREATE_RECIPE_WITH_INGREDIENTS_AND_CREATOR } from '../../graphql/mutations';
import { CreateRandomID } from '../../helpers/functions'
interface AddButtonProps {
  children?: React.ReactNode;
}

const animatedComponents = makeAnimated();

const AddButton: React.FC<AddButtonProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      onCompleted: () => {
        console.log(`Recipe ${name?.toUpperCase} has been created!`);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const [flavorsList, setFlavorsList] = React.useState<Flavor[]>();
  const [selectedOption, setSelectedOption] = React.useState<any>();
  const [createRecipeInfo, setCreateRecipeInfo] = React.useState();
  const [measurement, setMeasurement] = React.useState<string>('g');
  const [name, setName] = React.useState<string>();

  const handleChange = (selectedOption: any) => {
    setSelectedOption({ selectedOption });
  };

  const handleCreateRecipe = (e:any) => {
    e.preventDefault();
    // WE NEED SOME VALIDATION RIGHT HERE.

    const recipeInfo = [
      ...selectedOption.selectedOption
    ];

    const newFlavorInfo = recipeInfo.map(flavor => {
      const qty = (document.getElementById(
        `${flavor.value}`
      ) as HTMLInputElement).value;

      let rObj:any = {}
      rObj['amount'] = parseInt(qty)
      rObj['measurement'] = measurement;
      rObj['flavorId'] = flavor.value;
      return rObj;
    });

    const createRecipePayload: any = {
      recipeId: CreateRandomID(32),
      name: name,
      description: "hardcoded description until we get an input field",
      // published: new Date().toISOString(),
      userId: "50c0c7f3-f819-4696-b582-86d97ba59dde",
      ingredients: newFlavorInfo,
    };

    alert(JSON.stringify(createRecipePayload))
    createRecipe(createRecipePayload);

  }

  React.useEffect(() => {
    var result = data?.Flavor.map((flavor: Flavor) => ({
      value: flavor.flavorId,
      label: flavor.name,
    }));
    setFlavorsList(result);
  }, [data]);

  return (
    <React.Fragment>
      <Box className="AddPostBtn p-4 shadow rounded flex flex-wrap items-center justify-center mb-4">
        <Button onClick={handleModalOpen} className="w-full flex">
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
              <FormControl className="mb-3" as="fieldset">
                <FormLabel as="legend">Flavor Unit of Measurement</FormLabel>
                <RadioGroup
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMeasurement(e.target.value)
                  }
                  value={measurement}
                  className="flex flex-wrap justify-normal"
                  defaultValue="g"
                >
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
