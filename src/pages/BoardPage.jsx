import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Paper } from "@mui/material";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Toast from '../components/utilityComponets/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, selectBoards } from '../features/boardSlice';
import { selectLoader } from '../features/loaderSlice';
import Loader from '../components/utilityComponets/Loader';
import FormModal from '../components/utilityComponets/FormModal';

function BoardPage() {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const loader = useSelector(selectLoader);

  useEffect(() => {
    const getBoards = () => {
      try {
        dispatch(fetchBoards());
      } catch (error) {
        toast.error(error.message);
      }
    };

    getBoards();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <Container sx={{ marginTop: '40px', padding: '20px' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography sx={{ fontSize: 40, fontWeight: 'bold' }} variant="h4">Boards</Typography>
          </Grid>
          <Grid item>
            {boards.length != 10 && (<FormModal name='Board' />)}
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 3 }}>
          {boards.map((board) => (
            <Grid item key={board.id} xs={12} sm={6} md={4}>
              <Link to={`/lists/${board.id}`} style={{ textDecoration: 'none' }}>
                <Paper sx={{ padding: '40px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{board.name}</Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Toast />
    </>
  );
}

export default BoardPage;
