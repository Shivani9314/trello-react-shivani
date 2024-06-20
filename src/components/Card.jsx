import React, { useState } from 'react';
import { IconButton, Paper, Typography } from '@mui/material';
import {  deleteCardApi } from '../Api'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import CardModal from './CardModal';

function Card({ cardData, cards, setCards, setLoader }) {
  const [cardModalState, setCardModalState] = useState(false);


  const handleDelete = async (event) => {
    event.stopPropagation(); 

    try {
      setLoader(true)
      const newCards = cards.filter(card => card.id !== cardData.id);
      await deleteCardApi(cardData.id); 
      setCards(newCards);
    } catch (error) {
      toast.error('Error deleting card:', error);
    }finally{
      setLoader(false)
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
      <Typography style={{ flexGrow: 1 , fontSize:18}}>
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
        setLoader={setLoader}
      />
    )}
  </>
  );
}

export default Card;
