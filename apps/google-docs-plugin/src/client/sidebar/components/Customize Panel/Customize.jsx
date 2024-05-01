import React from 'react';
import SentenceRemixCustom from './SentenceRemixCustom';
import Typography from '@mui/material/Typography';
import NumSuggestions from './NumSuggestions';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InspirationTypeCustom from './InspirationTypeCustom';
import DocInfoCustom from './DocInfoCustom.jsx';

const Customize = () => (
  
  <div>
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6">Sentence Remix Settings</Typography>
        <SentenceRemixCustom/>
      </Box>
      <Box>
        <Typography variant="h6">AI Suggestions</Typography>
        <NumSuggestions/>
      </Box>
      <Box>
        <Typography variant="h6">Inspiration Presentation</Typography>
        <Typography variant="caption">Select how much text should accompany bookmarked inspiration</Typography>
        <InspirationTypeCustom/>
      </Box>
      <Box>
        <Typography variant="h6">Document Information (Optional)</Typography>
        <Typography variant="caption">Specify your document type, audience, writing style, and writing tone to customize AI suggestions</Typography>
        <Box height={20}></Box>
        <DocInfoCustom/>
      </Box>
    </Stack>
  </div>
);

export default Customize;
