import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import Divider from '@mui/material/Divider';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SavedRemix() {

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

  return (
    <Card>
        <CardHeader 
            title={<Typography variant="subtitle1" >Paraphrase</Typography>}
            subheader={<Typography variant="caption" >May 1, 2024</Typography>}>
        </CardHeader>
        <Divider/>
      <CardContent>
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
        <Chip label="inspiration word" 
                onClick={handleClick}
                onDelete={handleDelete}/>
        <Chip label="This is one sentence where I can type a lot if I really wanted to" 
                onClick={handleClick}
                onDelete={handleDelete}
                sx={{
                    height: 'auto',
                    '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                    padding: '10px'
                    },
                }}/>
        </Stack>
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
      </CardContent>
      
    </Card>
  );
}