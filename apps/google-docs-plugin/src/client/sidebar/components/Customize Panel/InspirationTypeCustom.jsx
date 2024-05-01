import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function InspirationTypeCustom() {
    return (
        <div>
            <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="inspo-only"
        name="radio-buttons-group"
      >
        <FormControlLabel value="inspo" control={<Radio />} label="Inspiration Only" />
        <FormControlLabel value="inspo-sentence" control={<Radio />} label="Inspiration sentence" />
        <FormControlLabel value="inspo-and-sentences" control={<Radio />} label="Inspiration and surrounding sentences" />
        <FormControlLabel value="inspo-paragraph" control={<Radio />} label="Inspiration paragraph" />
      </RadioGroup>
    </FormControl>
        </div>
    )
};