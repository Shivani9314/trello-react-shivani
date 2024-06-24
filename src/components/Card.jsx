import React, { useState } from 'react';
import { IconButton, Paper, Typography } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import CardModal from './CardModal';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteACard } from '../features/cardSlice';

function Card({ cardData }) {
  const [cardModalState, setCardModalState] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async (event) => {
    event.stopPropagation(); 

    try {
      await dispatch(deleteACard({cardId:cardData.id, listId:cardData.idList})).unwrap();
    } catch (error) {
      toast.error("Error in Deleting Card");
    } 
  };

  return (
    <>
      <Paper
        onClick={() => setCardModalState(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          padding: '10px',
          marginBottom: '10px'
        }}
      >
        <Typography style={{ flexGrow: 1, fontSize: 18 }}>
          {cardData.name}
        </Typography>
        <IconButton onClick={handleDelete} style={{ marginLeft: '10px' }}>
          <FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: '1rem' }} />
        </IconButton>
      </Paper>
      {cardModalState && (
        <CardModal
          state={cardModalState}
          setState={setCardModalState}
          cardData={cardData}
        />
      )}
    </>
  );
}

export default Card;
