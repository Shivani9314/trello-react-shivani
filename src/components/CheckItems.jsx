import React from 'react';
import { Box, Typography, Checkbox, IconButton, Paper } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function CheckItems({ checkItemData,handleDeleteCheckitem,handleUpdateCheckitem}) {


    return (
        <Paper sx={{ padding: 1, marginBottom: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Checkbox
                    checked={checkItemData.state === "complete"}
                    onChange={handleUpdateCheckitem}
                />
                <Typography sx={{ flexGrow: 1 }}>{checkItemData.name}</Typography>
                <IconButton onClick={handleDeleteCheckitem}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </IconButton>
            </Box>
        </Paper>
    );
}

export default CheckItems;
