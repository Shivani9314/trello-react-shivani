import React from 'react';
import Navbar from './components/utilityComponets/Navbar';
import BoardPage from './pages/BoardPage';
import { ThemeProvider } from '@emotion/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import theme from './Theme/theme';
import ListPage from './pages/ListPage';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';


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
    <Provider store={store} >
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Navbar />
      <RouterProvider router={router} />
    </ThemeProvider>
    </Provider>
  );
}

export default App;
