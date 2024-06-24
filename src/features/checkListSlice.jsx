import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCheckList, getCheckLists, deleteChecklist } from "../Api";
import { hideLoader, showLoader } from "./loaderSlice";

const initialState = {
    checklists: {},
};

export const fetchChecklistData = createAsyncThunk(
    'checklists/fetchChecklistData',
    async (cardId, { dispatch }) => {
        try {
            dispatch(showLoader());
            const checklistsData = await getCheckLists(cardId);
            return { cardId, checklists: checklistsData };
        } catch (error) {
            throw error;
        } finally {
            dispatch(hideLoader());
        }
    }
);

export const createChecklist = createAsyncThunk(
    'checklists/createChecklist',
    async ({ checklistName, cardId }, { dispatch }) => {
        try {
            dispatch(showLoader());
            const newChecklist = await createCheckList(checklistName, cardId);
            return { cardId, checklist: newChecklist };
        } catch (error) {
            throw error;
        } finally {
            dispatch(hideLoader());
        }
    }
);

export const deleteAChecklist = createAsyncThunk(
    'checklists/deleteChecklist',
    async ({ checklistId, cardId }, { dispatch }) => {
        try {
            dispatch(showLoader());
            await deleteChecklist(checklistId);
            return { checklistId, cardId };
        } catch (error) {
            throw error;
        } finally {
            dispatch(hideLoader());
        }
    }
);

const checklistSlice = createSlice({
    name: 'checklists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChecklistData.fulfilled, (state, action) => {
                const { cardId, checklists } = action.payload;
                state.checklists[cardId] = checklists;
            })
            .addCase(createChecklist.fulfilled, (state, action) => {
                const { cardId, checklist } = action.payload;
                state.checklists[cardId].unshift(checklist);
            })
            .addCase(deleteAChecklist.fulfilled, (state, action) => {
                const {checklistId , cardId} = action.payload;
                state.checklists[cardId] = state.checklists[cardId].filter(checklist => checklist.id !== checklistId);
            });
    }
});

export const selectChecklistsByCardId = (cardId) => (state) => state.checklists.checklists[cardId] || [];

export default checklistSlice.reducer;
