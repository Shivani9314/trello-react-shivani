import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button, InputBase, LinearProgress } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import CheckItems from './CheckItems';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createNewCheckitem, fetchCheckitemsData, selectCheckitemsByChecklistId,deleteACheckItem, upgradeCheckitems  } from '../features/checkItemsSlice';

function CheckList({ checkListData, deleteCheckList }) {
    const checkItems = useSelector(selectCheckitemsByChecklistId(checkListData.id));
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCheckItems = async () => {
            try {
                await dispatch(fetchCheckitemsData(checkListData.id)).unwrap();
            } catch (error) {
                toast.error("Failed to fetch check items");
            }
        };

        fetchCheckItems();
    }, []);


    const totalItems = checkItems.length;
    const completedItems = checkItems.filter((item) => item.state === "complete").length;
    const percentCompletion = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;


    const handleUpdateCheckitem = async (event, checkItemId) => {
        const checkState = event.target.checked ? "complete" : "incomplete";
        try {
            await dispatch(upgradeCheckitems({cardId :checkListData.idCard, checkitemId: checkItemId, checkState: checkState,checklistId:checkListData.id})).unwrap(); 
        } catch (error) {
            toast.error('Failed to update check item'); 
        }
    };

    const handleDeleteCheckitem = async (checkItemId) => {
        try {
            await dispatch(deleteACheckItem({ checkitemId: checkItemId ,checklistId: checkListData.id })).unwrap();
        } catch (error) {
            toast.error('Failed to delete check item'); 
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCheckItem = event.target.checkitemName.value;

        if (newCheckItem.length > 2) {
            event.target.checkitemName.value = "";
            try {
                await dispatch(createNewCheckitem({ checkitemName: newCheckItem, checklistId: checkListData.id })).unwrap();
            } catch (error) {
                toast.error('Failed to create checkitem');
            }
        } else {
            toast.error("Check item name should be more than 2 characters.");
        }
    };

    return (
        <>
            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon
                            icon={faSquareCheck}
                            style={{
                                width: "32px",
                                height: "32px",
                                color: 'white',
                                marginRight: '8px'
                            }}
                        />
                        <Typography color={'whitesmoke'}>
                            {checkListData.name}
                        </Typography>
                    </Box>
                    <IconButton onClick={() => deleteCheckList(checkListData.id)}>
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{ width: "24px", height: "24px" }}
                        />
                    </IconButton>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
                    <Typography
                        sx={{
                            width: "32px",
                            textAlign: "center",
                            fontWeight: "bold",
                            color: 'white'
                        }}
                    >
                        {percentCompletion}%
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={percentCompletion}
                        sx={{ flexGrow: 1 }}
                    />
                </Box>
                <Box sx={{ ml: 4 }}>
                    {checkItems.map((checkItem) => (
                        <CheckItems
                            key={checkItem.id}
                            checkItemData={checkItem}
                            checkItems={checkItems}
                            checklistID = {checkListData.id}
                            handleDeleteCheckitem = {()=> handleDeleteCheckitem(checkItem.id)}
                            handleUpdateCheckitem = {(event)=>handleUpdateCheckitem(event,checkItem.id)}
                        />
                    ))}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                height: "100%",
                                minWidth: "40px",
                                fontSize: "1rem",
                                py: "15px",
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <InputBase
                            placeholder="Add item"
                            id="checkitemName"
                            name="checkitemName"
                            sx={{
                                color: "white",
                                px: 4,
                                py: 1,
                                borderRadius: "5px",
                                border: 1,
                                flex: 1,
                                minHeight: "32px",
                                width: "100px",
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default CheckList;
