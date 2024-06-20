import React, { useEffect, useState } from 'react';
import { createBoards, getAllBoards } from '../Api';
import { Container, Grid, Typography, Button, Paper } from "@mui/material";
import CreationForm from '../components/utilityComponets/PageForm';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Toast from '../components/utilityComponets/Toast';
import Loader from '../components/utilityComponets/Loader';

function BoardPage() {
  const [boards, setBoards] = useState([]);
  const [formState, setFormState] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await getAllBoards();
        setBoards(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchBoards();
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const boardName = event.target.form.value;

    if (boards.length === 10) {
      toast.error("Boards creation limit exceeded");
      return;
    }

    if (boardName.length > 2) {
      event.target.form.value = "";
      try {
        setLoader(true);
        const createNewBoard = await createBoards(boardName);
        setBoards([createNewBoard, ...boards]);
        setFormState(true);
      } catch (err) {
        toast.error(err.message);
      }
      finally{
        setLoader(false);
      }
    } else {
      toast.error("Board name must be at least 3 characters long");
    }
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <Container sx={{ marginTop: '40px', padding: '20px' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography sx={{fontSize:40, fontWeight:'bold'}} variant="h4">Boards</Typography>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              onClick={() => setFormState(false)} 
              sx={{ padding: 2, fontSize: 17, fontWeight: 600 }}
            >
              + Create Board
            </Button>
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
      {!formState && (
        <CreationForm
          state={formState}
          onSubmit={handleOnSubmit}
          setState={setFormState}
          name="Board"
        />
      )}
      <Toast />
    </>
  );
}

export default BoardPage;
