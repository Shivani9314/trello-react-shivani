import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBoards, getAllBoards, getBoard } from "../Api";
import { hideLoader, showLoader } from "./loaderSlice"; // Assuming you have loaderSlice implemented

const initialState = {
    boards: [],
};

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async (_, { dispatch }) => {
    try {
        dispatch(showLoader()); 
        const boardsData = await getAllBoards();
        return boardsData;
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader()); 
    }
});

export const fetchABoard = createAsyncThunk('boards/fetchABoard', async (boardId, { dispatch }) => {
    try {
        dispatch(showLoader());
        const boardData = await getBoard(boardId);
        return boardData;
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader());
    }
});

export const createABoard = createAsyncThunk('boards/createNewBoard', async (boardName, { dispatch }) => {
    try {
        dispatch(showLoader()); 
        const newBoard = await createBoards(boardName);
        return newBoard;
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader()); 
    }
});

const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.boards = action.payload;
            })
            .addCase(fetchABoard.fulfilled, (state, action) => {
                state.selectedBoard = action.payload;
            })
            .addCase(createABoard.fulfilled, (state, action) => {
                state.boards.unshift(action.payload);
            });
    },
});

export const selectBoards = (state) => state.boards.boards;

export default boardsSlice.reducer;
