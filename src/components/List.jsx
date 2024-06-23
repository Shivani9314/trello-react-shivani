import React, { useEffect } from 'react';
import { Box, Paper, Typography, IconButton, Button, TextField } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import Card from './Card';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAList } from '../features/listSlice';
import { selectCardsByListId, createACard, fetchCardsData } from '../features/cardSlice';

function List({ listData, setLoader }) {
    const cards = useSelector(selectCardsByListId(listData.id));
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchCardsData(listData.id)).unwrap();
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchData();
    }, [dispatch, listData.id]);

    const handleClickDelete = async () => {
        try {
            await dispatch(deleteAList(listData.id)).unwrap();
        } catch (error) {
            toast.error(error.message);
        } 
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const newCardName = event.target.cardName.value;
        if (newCardName.length > 2) {
            event.target.cardName.value = "";
            try {
                await dispatch(createACard({ cardName: newCardName, listId: listData.id })).unwrap();
            } catch (error) {
                toast.error(error.message);
            }
        } else {
            toast.error("Card name should be more than 2 characters.");
        }
    };

    return (
        <Paper sx={{ marginBottom: '20px', padding: '20px', minWidth: '320px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ flexGrow: 1, fontSize: 24, fontWeight: 600 }}>
                    {listData.name}
                </Typography>
                <IconButton onClick={handleClickDelete}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </IconButton>
            </Box>
            <Box sx={{ marginTop: '10px' }}>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        cardData={card}
                    />
                ))}
            </Box>
            <Box component="form" onSubmit={handleFormSubmit} sx={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                <Button type="submit" variant="contained" color="primary">
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px', paddingTop: 10, paddingBottom: 10, fontSize: 16 }} />
                </Button>
                <TextField
                    variant="outlined"
                    placeholder="Enter card name"
                    id="cardName"
                    name="cardName"
                    sx={{ marginLeft: '10px' }}
                />
            </Box>
        </Paper>
    );
}

export default List;
