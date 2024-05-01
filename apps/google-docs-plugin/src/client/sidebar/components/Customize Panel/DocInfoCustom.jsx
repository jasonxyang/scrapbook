import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function DocInfoCustom() {
    return (
        <div>
            <Stack  spacing={2}>
            <TextField
            id="outlined-helperText"
            label="Document Title"
            type="search"
            helperText="Enter the name of your document"
            />
            <TextField
            id="outlined-helperText"
            label="Document Audience"
            type="search"
            helperText="Customize your audience (e.g., admissions committee, professors, students"
            />

            <TextField
            id="outlined-helperText"
            label="Writing Tone"
            type="search"
            helperText="Customize your writing tone (e.g., formal, casual, business)"
            />
            <TextField
            id="outlined-helperText"
            label="Writing Style"
            type="search"
            helperText="Customize your writing style (e.g., narrative, expository, descriptive)"
            />
            </Stack>
        </div>
    )
};