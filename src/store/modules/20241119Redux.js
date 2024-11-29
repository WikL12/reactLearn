import { createSlice } from "@reduxjs/toolkit";

const reduxStore = createSlice({
    name: "reduxStore",
    initialState: {
        count:0,
    },
    reducers:{
        addCount(state){
            state.count += 1;
        },
        decreamentCount(state){
            state.count -= 1;
        },
        setCount(state, action){
            state.count = action.payload;
        }
    }
});
 const {addCount, decreamentCount,setCount} = reduxStore.actions;

function setCountBySync(){
    // 异步操作
    return async (dispatch ) => {
     await setTimeout(() => {
            dispatch(setCount(100));
        }, 1000);
    }
}

export {addCount, decreamentCount,setCount,setCountBySync}

export default reduxStore.reducer;