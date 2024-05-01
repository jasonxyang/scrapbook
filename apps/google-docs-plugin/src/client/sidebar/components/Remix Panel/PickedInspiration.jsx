import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function PickedInspiration() {
  return (
   <div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
        <Box fontFamily={'Roboto'} height={100} sx={{overflowY: 'auto', padding: 2,}}>The history of ice cream traces back to ancient civilizations, where inventive minds experimented with combinations of snow, ice, and flavors. Millennia later, during the Renaissance, Italian chefs refined these concoctions into what we now recognize as gelato, the precursor to modern ice cream. As trade routes expanded and culinary techniques evolved, ice cream gradually became more accessible, spreading its delightful influence across continents.</Box>
        <Pagination count={3} defaultPage={1} siblingCount={0} />
   </div>
  );
}

export default PickedInspiration;
