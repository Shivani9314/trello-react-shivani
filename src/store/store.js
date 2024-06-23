import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boardSlice";
import listsReducer from '../features/listSlice';
import cardsReducer from '../features/cardSlice'
import checkListReducer from '../features/checkListSlice'
import checkitemsReducer from '../features/checkItemsSlice'
import loaderReducer from '../features/loaderSlice'


export const store = configureStore({
    reducer:{
        boards : boardsReducer,
        lists : listsReducer,
        cards : cardsReducer,
        checklists : checkListReducer, 
        checkitems : checkitemsReducer,
        loader: loaderReducer
    }
})