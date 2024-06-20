import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createNewList, getListOfBoard } from '../Api';
import { Container, Grid, Typography, Button, IconButton, Box } from "@mui/material";
import CreationForm from '../components/utilityComponets/PageForm';
import List from '../components/List';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import theme from '../Theme/theme';
import Loader from '../components/utilityComponets/Loader';
import toast from 'react-hot-toast';
import Toast from '../components/utilityComponets/Toast';

function ListPage() {
    const { boardId } = useParams();
    const [lists, setLists] = useState([]);
    const [formState, setFormState] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                setLoading(true);
                const data = await getListOfBoard(boardId);
                setLists(data);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLists();
    }, [boardId]);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const listName = event.target.form.value;

        if (listName.length > 2) {
            event.target.form.value = "";
            try {
                setLoading(true);
                const createList = await createNewList(listName, boardId);
                setLists((prevLists) => [createList, ...prevLists]);
                setFormState(true);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("List name must be at least 3 characters long");
        }
    };

    return (
        <>
            {loading && <Loader />}
            <Container sx={{ marginTop: '40px', padding: '20px', width: '100%' }}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <IconButton component={Link} to="/">
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                style={{
                                    color: theme.palette.secondary.contrastText,
                                }}
                            />
                        </IconButton>
                        <Typography sx={{ fontSize: 40, fontWeight: 'bold' }} variant="h4">Lists</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => setFormState(false)} sx={{ padding: 2, fontSize: 17, fontWeight: 600 }}>
                            + Create List
                        </Button>
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
                            setLists={setLists}
                            setLoader={setLoading}
                        />
                    ))}
                </Box>
            </Container>
            <CreationForm
                state={formState}
                onSubmit={handleOnSubmit}
                setState={setFormState}
                name="List"
            />
            <Toast />
        </>
    );
}

export default ListPage;
