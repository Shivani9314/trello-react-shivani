import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button, InputBase, LinearProgress } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { createCheckitem, getCheckItems } from '../Api';
import CheckItems from './CheckItems';
import toast from 'react-hot-toast';

function CheckList({ checkListData, deleteCheckList, setLoader }) {
    const [checkItems, setCheckItems] = useState([]);
    const [itemsCompletedPercent, setItemsCompletedPercent] = useState(0);

    useEffect(() => {
        const fetchCheckItems = async () => {
            try {
                setLoader(true);
                const data = await getCheckItems(checkListData.id);
                setCheckItems(data);
                handleProgressBar(data);
            } catch (error) {
                toast.error("Failed to fetch check items");
            }finally{
                setLoader(false);
            }
        };

        fetchCheckItems();
    }, [checkListData.id]);

    const handleProgressBar = (items) => {
        let checkItemCount = items.filter((item) => item.state === 'complete').length;
        let completed = items.length ? Math.floor((checkItemCount / items.length) * 100) : 0;
        setItemsCompletedPercent(completed);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCheckItem = event.target.checkitemName.value;

        if (newCheckItem.length > 2) {
            event.target.checkitemName.value = "";
            try {
                setLoader(true)
                const createNewCheckItem = await createCheckitem(newCheckItem, checkListData.id);
                const updatedCheckItems = [createNewCheckItem, ...checkItems];
                setCheckItems(updatedCheckItems);
                handleProgressBar(updatedCheckItems);
            } catch (error) {
                toast.error('Failed to create check item'); 
            }finally{
                setLoader(false)
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
                            setCheckItems={setCheckItems}
                            cardId={checkListData.idCard}
                            updateProgressBar={handleProgressBar}
                            setLoader = {setLoader}
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
                                border:1,
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
