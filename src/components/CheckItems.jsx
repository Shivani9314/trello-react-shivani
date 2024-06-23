import React, { useEffect } from 'react';
import { Box, Typography, Checkbox, IconButton, Paper } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import toast from 'react-hot-toast'; 
import { useDispatch } from 'react-redux';
import { deleteACheckItem, upgradeCheckitems } from '../features/checkItemsSlice';

function CheckItems({ checkItemData,checkItems, cardId, updateProgressBar }) {
    const dispatch = useDispatch();

    useEffect(()=>{
        updateProgressBar(checkItems)
    },[checkItems])


    const handleUpdateCheckitem = async (event, checkItemId) => {
        const checkState = event.target.checked ? "complete" : "incomplete";
        try {
            await dispatch(upgradeCheckitems({cardId, checkitemId: checkItemId, checkState: checkState,checklistId:checkItemData.idChecklist })); 
        } catch (error) {
            toast.error('Failed to update check item'); 
        }
    };

    const handleDeleteCheckitem = async (checkItemId) => {
        try {
            await dispatch(deleteACheckItem({ checkitemId: checkItemId ,checklistId: checkItemData.idChecklist }));
        } catch (error) {
            toast.error('Failed to delete check item'); 
        }
    };

    return (
        <Paper sx={{ padding: 1, marginBottom: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Checkbox
                    checked={checkItemData.state === "complete"}
                    onChange={(event) => handleUpdateCheckitem(event, checkItemData.id)}
                />
                <Typography sx={{ flexGrow: 1 }}>{checkItemData.name}</Typography>
                <IconButton onClick={() => handleDeleteCheckitem(checkItemData.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </IconButton>
            </Box>
        </Paper>
    );
}

export default CheckItems;
