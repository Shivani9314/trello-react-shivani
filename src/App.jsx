import React from 'react';
import Navbar from './components/utilityComponets/Navbar';
import BoardPage from './pages/BoardPage';
import { ThemeProvider } from '@emotion/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import theme from './Theme/theme';
import ListPage from './pages/ListPage';
import { CssBaseline } from '@mui/material';

function App() {

  const router = createBrowserRouter([
    {
        path: "/",
        element: <BoardPage />
    },
    {
        path: "/boards",
        element: <BoardPage />
    },
    {
        path: "/lists/:boardId",
        element: <ListPage />
    },

])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Navbar />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
