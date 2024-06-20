import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import theme from '../../Theme/theme';

function CreationForm({ state, setState, name, onSubmit }) {
  return (
    <Dialog open={!state} onClose={() => setState(true)} >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography variant="div" sx={{ fontSize: 20, fontWeight: 'bold' }}>
            Create a new {name}
          </Typography>
          <IconButton aria-label="close" onClick={() => setState(true)} sx={{ position: 'absolute',
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[400],}}>
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="form"
            label={`${name} Name`}
            type="text"
            fullWidth
            required
            name="formName" 
          />
        </DialogContent>
        <DialogContent>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default CreationForm;
