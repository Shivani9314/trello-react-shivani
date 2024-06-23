import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button, InputBase, LinearProgress } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import CheckItems from './CheckItems';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createNewCheckitem, fetchCheckitemsData, selectCheckitemsByChecklistId } from '../features/checkItemsSlice';

function CheckList({ checkListData, deleteCheckList, setLoader }) {
    const checkItems = useSelector(selectCheckitemsByChecklistId(checkListData.id));
    const dispatch = useDispatch();
    const [itemsCompletedPercent, setItemsCompletedPercent] = useState(0);

    useEffect(() => {
        const fetchCheckItems = async () => {
            try {
                await dispatch(fetchCheckitemsData(checkListData.id));
            } catch (error) {
                toast.error("Failed to fetch check items");
            }
        };

        fetchCheckItems();
    }, [checkListData.id, dispatch]);



    const handleProgressBar = (items) => {
        if (items) {
            let checkItemCount = items.filter((item) => item.state === 'complete').length;
            let completed = items.length ? Math.floor((checkItemCount / items.length) * 100) : 0;
            setItemsCompletedPercent(completed);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCheckItem = event.target.checkitemName.value;

        if (newCheckItem.length > 2) {
            event.target.checkitemName.value = "";
            try {
                await dispatch(createNewCheckitem({ checkitemName: newCheckItem, checklistId: checkListData.id }))
            } catch (error) {
                toast.error('Failed to create checkitem');
            }
        } else {
            toast.error("Check item name should be more than 2 characters.");
        }
    };

    useEffect(()=>{
        handleProgressBar(checkItems);
    },[checkItems])


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
                        {itemsCompletedPercent}%
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={itemsCompletedPercent}
                        sx={{ flexGrow: 1 }}
                    />
                </Box>
                <Box sx={{ ml: 4 }}>
                    {checkItems.map((checkItem) => (
                        <CheckItems
                            key={checkItem.id}
                            checkItemData={checkItem}
                            checkItems={checkItems}
                            cardId={checkListData.idCard}
                            updateProgressBar={handleProgressBar}
                            setLoader={setLoader}
                            checklistID = {checkListData.id}
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
