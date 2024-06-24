import React, { useRef,useState } from 'react';
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
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { createABoard } from '../../features/boardSlice';
import { createNewListInBoard } from '../../features/listSlice';
import { useParams } from 'react-router-dom';

function FormModal({ name }) {
  const [openFormModal, setOpenFormModal] = useState(true);
  const formNameRef = useRef();
  const dispatch = useDispatch();
  const {boardId} = useParams();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formName = formNameRef.current.value;

    if (formName.length > 2) {
      formNameRef.current.value = "";
      try {
        if(name === 'Board'){
          await dispatch(createABoard(formName)).unwrap();
        }
        else{
          await dispatch(createNewListInBoard({listName:formName, boardId})).unwrap();
        }
        setOpenFormModal(true);
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error(`${name} name must be at least 3 characters long`);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpenFormModal(false)}
        sx={{ padding: 2, fontSize: 17, fontWeight: 600 }}
      >
        + Create {name}
      </Button>
      <Dialog open={!openFormModal} onClose={() => setOpenFormModal(true)} >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="div" sx={{ fontSize: 20, fontWeight: 'bold' }}>
              Create a new {name}
            </Typography>
            <IconButton aria-label="close" onClick={() => setOpenFormModal(true)} sx={{
              position: 'absolute',
              position: "absolute",
              right: theme.spacing(1),
              top: theme.spacing(1),
              color: theme.palette.grey[400],
            }}>
              <FontAwesomeIcon icon={faXmark} />
            </IconButton>
          </Box>
        </DialogTitle>
        <form onSubmit={handleOnSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="form"
              label={`${name} Name`}
              type="text"
              fullWidth
              required
              inputRef={formNameRef}
            />
          </DialogContent>
          <DialogContent>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default FormModal;
