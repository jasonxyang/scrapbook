import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';


function AddInspo() {
    return(
    <div>
        <TextField
            id="inspo-textarea"
            label="Add inspo to remix"
            placeholder="Placeholder"
            multiline
            variant="filled"
            rows={5}
            maxRows={10}
        />
        <Stack spacing={1} direction={'column-reverse'}>
      <Button variant="text">Clear</Button>
      <Button variant="outlined">Paste from Clipboard</Button>
      <Button variant="outlined">Auto-Add</Button>
        <Button variant="contained" startIcon={<AddIcon />}>
        Add Inspiration
        </Button>
        </Stack>
    </div>
    )
}

export default AddInspo;

