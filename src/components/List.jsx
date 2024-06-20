import React, { useEffect, useState } from 'react';
import { createNewCard, deleteList, getCardsOfList } from '../Api';
import { Box, Paper, Typography, IconButton, Button, TextField } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import Card from './Card';
import toast from 'react-hot-toast';

function List({ listData, lists, setLists, setLoader }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoader(true);
                const data = await getCardsOfList(listData.id);
                setCards(data);
            } catch (error) {
                toast.error(error.message);
            }finally{
                setLoader(false);
            }
        };
        fetchData();
    }, [listData.id]);

    const handleClickDelete = async () => {
        try {
            setLoader(true);
            const deletedList = await deleteList(listData.id);
            const newList = lists.filter((list) => list.id !== deletedList.id);
            setLists(newList);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoader(false);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const newCardName = event.target.cardName.value;
        if (newCardName.length > 2) {
            event.target.cardName.value = "";
            try {
                setLoader(true);
                const createCard = await createNewCard(newCardName, listData.id);
                setCards([createCard, ...cards]);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoader(false);
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
                        cards={cards}
                        setCards={setCards}
                        setLoader={setLoader}
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
