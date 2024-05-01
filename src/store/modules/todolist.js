import { createSlice } from "@reduxjs/toolkit";

const todoList = createSlice({
    name:'todoList',
    initialState:{
        todoList:[],
    },
    reducers:{
        addTodoList(state,action){
            state.todoList=action.payload
            alert(1)
        }
    }
})

const { addTodoList } = todoList.actions;

export {addTodoList}

export default todoList.reducer;
