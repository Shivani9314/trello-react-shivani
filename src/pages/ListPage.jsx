import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Grid, Typography, Button, IconButton, Box } from "@mui/material";
import List from '../components/List';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import theme from '../Theme/theme';
import Loader from '../components/utilityComponets/Loader';
import toast from 'react-hot-toast';
import Toast from '../components/utilityComponets/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListData, selectLists } from '../features/listSlice';
import { selectLoader } from '../features/loaderSlice';
import FormModal from '../components/utilityComponets/FormModal';

function ListPage() {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const lists = useSelector(selectLists);
    const loader = useSelector(selectLoader);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                await dispatch(fetchListData(boardId));
            } catch (err) {
                toast.error(err.message);
            }
        };

        fetchLists();
    }, [boardId]);


    return (
        <>
            {loader && <Loader />}
            <Container sx={{ marginTop: '40px', padding: '20px', width: '100%' }}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <IconButton component={Link} to="/">
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                style={{ color: theme.palette.secondary.contrastText }}
                            />
                        </IconButton>
                        <Typography sx={{ fontSize: 40, fontWeight: 'bold' }} variant="h4">Lists</Typography>
                    </Grid>
                    <Grid item>
                        <FormModal name='List'/>
                    </Grid>
                </Grid>

                <Box container spacing={4} sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: { md: "row", xs: "column" },
                    alignItems: { md: "start", xs: "center" },
                    gap: 4,
                    p: 2,
                    marginTop: 2,
                    overflowX: { md: "scroll", sm: "auto" },
                }}>
                    {lists && lists.map((list) => (
                        <List
                            key={list.id}
                            listData={list}
                            lists={lists}
                        />
                    ))}
                </Box>
            </Container>
            <Toast />
        </>
    );
}

export default ListPage;
