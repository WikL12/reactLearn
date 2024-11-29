import { createSlice } from "@reduxjs/toolkit";

const reduxStoreNew = createSlice({
    name:'reduxStoreNew',
    initialState:{
        array:[1,2,3,4,5,6,7,8,9,10],
    },
    reducers:{
       
        addArray(state){
            state.array.push(11)
        }
    },
});
function getReduxStoreNew(state){
    console.log('getReduxStoreNew', state);
    return state.reduxStoreNew.array
};
export default reduxStoreNew.reducer;
 const {addArray} = reduxStoreNew.actions;
 export {addArray,getReduxStoreNew}
