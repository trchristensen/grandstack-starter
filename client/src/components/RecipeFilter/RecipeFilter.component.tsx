import React from "react";
import { Box, FormControl, Input } from "@chakra-ui/core";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { SIMPLE_FLAVOR_QUERY } from "../../graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { Flavor } from "../../@types/schema";




const RecipeFilter = () => {
  const animatedComponents = makeAnimated();

   const [
    colourOptions,
    { loading, data, error },
  ] = useLazyQuery(SIMPLE_FLAVOR_QUERY, { errorPolicy: "all" });

  const [flavorList, setFlavorList] = React.useState<any>();
  const [inputValue, setInputValue] = React.useState<any>("");
  const [selectedOption, setSelectedOption] = React.useState<any>();

    const handleChange = (selectedOption: any) => {
    setSelectedOption({ selectedOption });
  };

 React.useEffect(() => {
   colourOptions()
    var result = data?.Flavor.map((flavor: Flavor) => ({
      value: flavor.flavorId,
      label: flavor.name,
    }));
    setFlavorList(result);
  }, [data]);

  

  return (
    <Box className="AddPostBtn bg-white p-4 shadow rounded flex flex-wrap items-center justify-center mb-4">
      <FormControl className="mb-3 w-full">
        <Input placeholder="Search..." />
      </FormControl>
      <FormControl className="mb-3 w-full">
        <Select
          className="w-full basic-multi-select"
          isMulti
          name="colors"
          options={flavorList}
          closeMenuOnSelect={false}
          components={animatedComponents}
          classNamePrefix="select"
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  );
};

export default RecipeFilter;
