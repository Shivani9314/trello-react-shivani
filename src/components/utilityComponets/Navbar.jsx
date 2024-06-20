import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import theme from '../../Theme/theme';

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1}}>
    <AppBar position="static">
      <Toolbar sx={{ml:20, padding:2.5}}>
        <IconButton
          size= "large"
          edge="start"
          color= ""
          aria-label="menu"
          sx={{ mr: 2 }}
        >
           <FontAwesomeIcon icon={faTrello} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TRELLO
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar