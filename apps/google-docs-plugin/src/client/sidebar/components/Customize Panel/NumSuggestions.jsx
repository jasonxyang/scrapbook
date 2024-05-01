import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function valuetext(value) {
    return `${value}`;
  }

export default function NumSuggestions() {
    return (
        <div>
            <Typography variant="caption">Select the number of AI suggestions created after each sentence remix </Typography>
            <Box sx={{ width: 'auto' }}>
            <Slider
                aria-label="Temperature"
                defaultValue={3}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                shiftStep={1}
                step={1}
                marks
                min={1}
                max={5}
            />
            </Box>
        </div>
    )
};