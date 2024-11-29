import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './modules/counterStore'
import channelReducer from './modules/channelStore';
import foodReducer from "./modules/foodStore";
import pricate from "./modules/pricate";
import tokenStore from "./modules/token";
import todoList from "./modules/todolist";
import foodList from "./modules/foodList";
import reduxStore from "./modules/20241119Redux";
import reduxStoreNew from "./modules/2024111902Redux";
import redux1120 from "./modules/redux1120";
const store = configureStore({
    reducer:{
        counter:counterReducer,
        channelList:channelReducer,
        foodObject:foodReducer,
        pricate:pricate,
        tokenStore:tokenStore,
        todoList,
        foodList,
        reduxStore,
        reduxStoreNew,
        redux1120
    }
})

export default store