import { Box, Button } from '@chakra-ui/core';
import Select from "react-select";
import React from 'react';
import { CreateRandomID } from '../../helpers/functions'

const Sandbox = () => {

  const [boxes, setBoxes] = React.useState([])
  const [increment, setIncrement] = React.useState(0)

  const handleAdd = () => {
    let d = new Date();
    let iso = d.toISOString();

    setIncrement(increment + 1)
    const box = {
      id: CreateRandomID(10).toString() + iso ,
      number: increment
    };
    setBoxes([
      ...boxes,
      box
    ])
  }

  return(
    <Box>
      <Button onClick={handleAdd}>Add Box</Button>
      {boxes.map(box => (
        <Box key={box.id}>{box.id} - {box.number}</Box>
      ))}
    </Box>
  )
}

export default Sandbox;