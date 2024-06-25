import React, { useEffect, useRef } from 'react';
import { IconButton, Button, Modal, Paper, Typography, TextField, Box } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import CheckList from './CheckList';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createChecklist, deleteAChecklist, fetchChecklistData, selectChecklistsByCardId } from '../features/checkListSlice';

function CardModal({ state, setState, cardData }) {
    const checkLists = useSelector(selectChecklistsByCardId(cardData.id));
    const dispatch = useDispatch();
    const checklistRef = useRef();

    useEffect(() => {
        const fetchCheckListData = async () => {
            try {
                await dispatch(fetchChecklistData(cardData.id)).unwrap()
            } catch (error) {
                toast.error("Error fetching checklist data:", error.message);
            }
        };

        fetchCheckListData();
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const newCheckListName = checklistRef.current.value;

        if (newCheckListName.length > 2) {
            checklistRef.current.value= "";
            try {
                await dispatch(createChecklist({checklistName:newCheckListName, cardId:cardData.id})).unwrap();
            } catch (error) {
                toast.error("Error creating checklist:", error.message);
            }
        } else {
            toast.error("Checklist name should be more than 2 characters.");
        }
    };

    const handleDeleteList = async (checklistId , cardId) => {
        try {
            await dispatch(deleteAChecklist({checklistId, cardId})).unwrap()
        } catch (error) {
            toast.error(`Error deleting checklist: ${error.message}`);
        }
    };


    return (
        <Modal open={state} onClose={() => setState(false)}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '90%',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: 0,
                        height: 0,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'transparent',
                    },
                    scrollbarWidth: 'none',

                }}
            >
                <IconButton
                    onClick={() => setState(false)}
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                    {cardData.name}
                </Typography>
                <form onSubmit={handleFormSubmit}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TextField
                            variant="outlined"
                            placeholder="Enter checklist name"
                            id="checkListName"
                            name="checkListName"
                            fullWidth
                            inputRef={checklistRef}
                        />
                        <Button type="submit" sx={{
                            ml: 1, height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            minWidth: "40px",
                            fontSize: "1rem",
                            py: "15px",
                            color:'white'
                        }}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Box>
                </form>
                <Box>
                    {checkLists.map((checkList) => (
                        <CheckList
                            key={checkList.id}
                            checkListData={checkList}
                            deleteCheckList={() => handleDeleteList(checkList.id, cardData.id)}
                        />
                    ))}
                </Box>
            </Box>
        </Modal>
    );
}

export default CardModal;