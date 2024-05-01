import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddInspo from './AddInspo';
import TextField from '@mui/material/TextField';
import CurrentInspo from './CurrentInspo';
import AllInspo from './AllInspo';


function Inspirations() {

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
          <Typography>Add New Inspiration from Current Document</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddInspo/>
        </AccordionDetails>
    </Accordion>



    <Accordion expanded={expanded[1]} onChange={() => (handleChange(1))}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content2"
        id="panel-header2"
      >
        <Typography>Inspiration from Current Document</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CurrentInspo/>
      </AccordionDetails>
    </Accordion>


    <Accordion expanded={expanded[2]} onChange={() => (handleChange(2))}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content3"
        id="panel-header3"
      >
        <Typography>All Inspiration</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AllInspo/>
      </AccordionDetails>
    </Accordion>
  </div>
);

}

export default Inspirations;
