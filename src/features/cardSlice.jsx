import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewCard, deleteCardApi, getCardsOfList } from "../Api";
import { hideLoader, showLoader } from "./loaderSlice"; 

const initialState = {
    cards: {},
};

export const fetchCardsData = createAsyncThunk('cards/fetchCardsData', async (listId, { dispatch }) => {
    try {
        dispatch(showLoader()); 
        const cardsDataOfList = await getCardsOfList(listId);
        return { listId, cards: cardsDataOfList };
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader());
    }
});

export const createACard = createAsyncThunk('cards/createACard', async ({ cardName, listId }, { dispatch }) => {
    try {
        dispatch(showLoader()); 
        const newCard = await createNewCard(cardName, listId);
        return { listId, card: newCard };
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader()); 
    }
});

export const deleteACard = createAsyncThunk('cards/deleteCard', async (cardId, { dispatch }) => {
    try {
        dispatch(showLoader()); 
        await deleteCardApi(cardId);
        return cardId;
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader()); 
    }
});

const cardSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCardsData.fulfilled, (state, action) => {
                state.cards[action.payload.listId] = action.payload.cards;
            })
            .addCase(createACard.fulfilled, (state, action) => {
                if (!state.cards[action.payload.listId]) {
                    state.cards[action.payload.listId] = [];
                }
                state.cards[action.payload.listId].unshift(action.payload.card);
            })
            .addCase(deleteACard.fulfilled, (state, action) => {
                for (let listId in state.cards) {
                    state.cards[listId] = state.cards[listId].filter(card => card.id !== action.payload);
                }
            });
    }
});

export const selectCardsByListId = (listId) => (state) => state.cards.cards[listId] || [];


export default cardSlice.reducer;
