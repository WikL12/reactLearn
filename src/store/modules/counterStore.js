import { createSlice } from '@reduxjs/toolkit'

const counterStore = createSlice({
    name:'counter',
    // 初始化
    initialState:{
        count:0
    },
    // 修改状态的方法
    reducers:{
        inscrement(state) {
            state.count ++;

        },
        decrement(state,action) {
            state.count  = state.count - action.payload;
        }
    }
})


// 解构出来Actioncreater函数
const {inscrement , decrement} = counterStore.actions;
// 获取reducer
const counterReducer = counterStore.reducer;

export {inscrement , decrement};
export default counterReducer;


