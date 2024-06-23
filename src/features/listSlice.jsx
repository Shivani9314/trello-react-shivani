import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewList, deleteList, getListOfBoard } from "../Api";
import { hideLoader, showLoader } from "./loaderSlice"; 

const initialState = {
    lists: [],
};

export const fetchListData = createAsyncThunk('lists/fetchListData', async (boardId, { dispatch }) => {
    try {
        dispatch(showLoader()); 
        const listsDataOfBoard = await getListOfBoard(boardId);
        return listsDataOfBoard;
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader()); 
    }
});

export const createNewListInBoard = createAsyncThunk('lists/createNewList', async ({ listName, boardId }, { dispatch }) => {
    try {
        dispatch(showLoader()); 
        const createAList = await createNewList(listName, boardId);
        return createAList;
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader()); 
    }
});

export const deleteAList = createAsyncThunk('lists/deleteList', async (listId, { dispatch }) => {
    try {
        dispatch(showLoader()); 
        const deletedList = await deleteList(listId);
        return deletedList;
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader()); 
    }
});

const listSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchListData.fulfilled, (state, action) => {
                state.lists = action.payload;
            })
            .addCase(createNewListInBoard.fulfilled, (state, action) => {
                state.lists.unshift(action.payload);
            })
            .addCase(deleteAList.fulfilled, (state, action) => {
                state.lists = state.lists.filter(list => list.id !== action.payload.id);
            });
    }
});

export const selectLists = (state) => state.lists.lists;

export default listSlice.reducer;
