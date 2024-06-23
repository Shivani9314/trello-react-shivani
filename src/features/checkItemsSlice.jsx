import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCheckitem, deleteCheckitem, getCheckItems, updateCheckitem } from "../Api";
import { hideLoader, showLoader } from "./loaderSlice"; 

const initialState = {
    checkitems: {},
};

export const fetchCheckitemsData = createAsyncThunk(
    'checkitems/fetchCheckitemsData',
    async (checklistId, { dispatch }) => {
        try {
            dispatch(showLoader()); 
            const checkitemsData = await getCheckItems(checklistId);
            return { checklistId, checkitems: checkitemsData };
        } catch (error) {
            throw error;
        } finally {
            dispatch(hideLoader()); 
        }
    }
);

export const createNewCheckitem = createAsyncThunk(
    'checkitems/createNewCheckitem',
    async ({ checkitemName, checklistId }, { dispatch }) => {
        try {
            dispatch(showLoader());
            const newCheckitem = await createCheckitem(checkitemName, checklistId);
            return { checklistId, checkitem: newCheckitem };
        } catch (error) {
            throw error;
        } finally {
            dispatch(hideLoader()); 
        }
    }
);

export const deleteACheckItem = createAsyncThunk(
    'checkitems/deleteACheckitem',
    async ({ checklistId, checkitemId }, { dispatch }) => {
        try {
            dispatch(showLoader());
            await deleteCheckitem(checkitemId, checklistId);
            return { checklistId, checkitemId };
        } catch (error) {
            throw error;
        } finally {
            dispatch(hideLoader()); 
        }
    }
);

export const upgradeCheckitems = createAsyncThunk(
    'checkitems/upgradeCheckitems',
    async ({ cardId, checklistId, checkitemId, checkState }, { dispatch }) => {
        try {
            dispatch(showLoader());
            await updateCheckitem(cardId, checkitemId, checkState);
            return { checklistId, checkitemId, checkState };
        } catch (error) {
            throw error;
        } finally {
            dispatch(hideLoader()); 
        }
    }
);

const checkitemsSlice = createSlice({
    name: 'checkitems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCheckitemsData.fulfilled, (state, action) => {
                const { checklistId, checkitems } = action.payload;
                state.checkitems[checklistId] = checkitems;
            })
            .addCase(createNewCheckitem.fulfilled, (state, action) => {
                const { checklistId, checkitem } = action.payload;
                if (state.checkitems[checklistId]) {
                    state.checkitems[checklistId].unshift(checkitem); 
                } else {
                    state.checkitems[checklistId] = [checkitem];
                }
            })
            .addCase(deleteACheckItem.fulfilled, (state, action) => {
                const { checklistId, checkitemId } = action.payload;
                state.checkitems[checklistId] = state.checkitems[checklistId].filter(checkitem => checkitem.id !== checkitemId);
            })
            .addCase(upgradeCheckitems.fulfilled, (state, action) => {
                const { checklistId, checkitemId, checkState } = action.payload;
                const checkitems = state.checkitems[checklistId];
                const index = checkitems.findIndex(checkitem => checkitem.id === checkitemId);
                if (index !== -1) {
                    checkitems[index].state = checkState;
                }
            });
    }
});

export const selectCheckitemsByChecklistId = (checklistId) => (state) => state.checkitems.checkitems[checklistId] || [];


export default checkitemsSlice.reducer;
