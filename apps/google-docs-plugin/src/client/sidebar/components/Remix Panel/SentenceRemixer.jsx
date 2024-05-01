import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';


function SentenceRemixer() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div>
      <ToggleButtonGroup
      color="primary"
      value={alignment}
      size="small"
      orientation="horizontal"
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
  <ToggleButton value="Paraphrase">Para</ToggleButton>
  <ToggleButton value="Summarize">Sum</ToggleButton>
  <ToggleButton value="Simplify">Simpl</ToggleButton>
  <ToggleButton value="Combine">Comb</ToggleButton>
</ToggleButtonGroup>

<TextField
          id="filled-textarea"
          label="Add inspo to remix"
          placeholder="Placeholder"
          multiline
          variant="filled"
          rows={5}
          maxRows={10}
        />
    </div>
  );
}

export default SentenceRemixer;
