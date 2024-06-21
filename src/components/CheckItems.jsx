import React, { useState } from 'react';
import { Box, Typography, Checkbox, IconButton, Paper } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteCheckitem, updateCheckitem } from '../Api';
import toast from 'react-hot-toast'; 

function CheckItems({ checkItemData, checkItems, setCheckItems, cardId, updateProgressBar,setLoader }) {

    const handleUpdateCheckitem = async (event, checkItemId) => {
        const checkState = event.target.checked ? "complete" : "incomplete";
        const newCheckItems = checkItems.map((checkItem) => checkItem.id === checkItemId ? { ...checkItem, state: checkState } : checkItem);

        setCheckItems(newCheckItems);

        try {
            setLoader(true);
            await updateCheckitem(cardId, checkItemId, checkState);
            updateProgressBar(newCheckItems);
        } catch (error) {
            toast.error('Failed to update check item'); 
        } finally{
            setLoader(false);
        }
    };

    const handleDeleteCheckitem = async (checkItemId) => {

        try {
            setLoader(true); 
            const newCheckItems = checkItems.filter((checkItem) => checkItem.id !== checkItemId);
            setCheckItems(newCheckItems);
            updateProgressBar(newCheckItems);
            await deleteCheckitem(checkItemId, checkItemData.idChecklist);
        } catch (error) {
            toast.error('Failed to delete check item'); 
        } finally {
            setLoader(false); 
        }
    };

    return (
        <>
            <Paper sx={{ padding: 1, marginBottom: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Checkbox
                        checked={checkItemData.state === "complete"}
                        onChange={(event) => handleUpdateCheckitem(event, checkItemData.id)}
                    />
                    <Typography sx={{ flexGrow: 1 }}>{checkItemData.name}</Typography>
                    <IconButton
                        onClick={() => handleDeleteCheckitem(checkItemData.id)}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </IconButton>
                </Box>
            </Paper>
        </>
    );
}

export default CheckItems;
