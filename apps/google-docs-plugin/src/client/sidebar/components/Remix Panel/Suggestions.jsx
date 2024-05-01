import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';


function Suggestions() {
    return(
        <List>
        <ListItemButton>
          <ListItemIcon>
            <ContentCopy />
          </ListItemIcon>
          <ListItemText primary="AI Suggestion 1" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ContentCopy />
          </ListItemIcon>
          <ListItemText primary="AI Suggestion 2" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ContentCopy />
          </ListItemIcon>
          <ListItemText primary="AI Suggestion 3" />
        </ListItemButton>
      </List>
    );
}

export default Suggestions;