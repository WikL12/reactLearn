import { createSlice } from "@reduxjs/toolkit";

const redux1120 = createSlice(
    {
        name: "redux1120",
        initialState: {
            list:[1,2,3,4],
        },
        reducers:{
            addList(state){
                state.list.push("redux1120");
            }
        }
    }
);

function getList(store) {
    return store.redux1120.list;
}

 const { addList } = redux1120.actions;
 export { getList, addList };
export default redux1120.reducer;