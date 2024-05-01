import React from'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';

export default function SentenceRemixCustom() {
    return (
        <div>
            <FormGroup>
            <FormControlLabel control={<Switch defaultChecked />} label="Paste first remixed sentence directly into document" />
            <FormControlLabel control={<Switch />} label="Copy the first remixed sentence directy into the clipboard" />
            <Tooltip title="Remixes will be fine-tuned to where your text cursor is">
            <FormControlLabel control={<Switch />} label="Suggest remixes based on what I'm currently typing" /></Tooltip>
            </FormGroup>
        </div>
    )
};