import React from 'react';
import { Menu, MenuItem, List, ListItemButton, ListItemIcon, ListItemText, ListItem, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
function CurrentInspo() {
    const options = [
        'Copy',
        'Edit',
        'Delete',
      ];


      const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
            <ListItemText>Here is some text. Pretend this is some kind of sentence.</ListItemText>
            <div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreHorizIcon />
                </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {options.map((option) => (
                <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                    {option}
                </MenuItem>
                ))}
            </Menu>
            </div>
          </ListItem>
        </List>
    );
}

export default CurrentInspo;
