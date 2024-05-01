import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SentenceRemixer from './SentenceRemixer';
import Suggestions from './Suggestions';
import PickedInspiration from './PickedInspiration';

function Remix() {

  const [expanded, setExpanded] = useState([]);

  const handleChange = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return(
  <div>
    <Accordion expanded={expanded[0]} onChange={() => (handleChange(0))}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content1"
          id="panel-header1"
        >
          <Typography>Sentence Remix</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SentenceRemixer/>
        </AccordionDetails>
    </Accordion>



    <Accordion expanded={expanded[1]} onChange={() => (handleChange(1))}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content2"
        id="panel-header2"
      >
        <Typography>AI Suggestions</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Suggestions/>
      </AccordionDetails>
    </Accordion>


    <Accordion expanded={expanded[2]} onChange={() => (handleChange(2))}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content3"
        id="panel-header3"
      >
        <Typography>Inspiration</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <PickedInspiration/>
      </AccordionDetails>
    </Accordion>
  </div>
);

}

export default Remix;
