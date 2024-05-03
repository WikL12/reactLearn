import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './modules/counterStore'
import channelReducer from './modules/channelStore';
import foodReducer from "./modules/foodStore";
import pricate from "./modules/pricate";
import tokenStore from "./modules/token";
import todoList from "./modules/todolist";
import foodList from "./modules/foodList";
const store = configureStore({
    reducer:{
        counter:counterReducer,
        channelList:channelReducer,
        foodObject:foodReducer,
        pricate:pricate,
        tokenStore:tokenStore,
        todoList,
        foodList
    }
})

export default store