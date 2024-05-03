import { createSlice } from "@reduxjs/toolkit";

const foodList = createSlice({
    name:'foodList',
    initialState:{
        foodList:[],
        carList:[],
    },
    actions:{
        changefoodList:(state,action)=>{
            state.foodList = action.payload
        },
        changeCarList:(state, action)=>{
            state.carList = action.payload
        }
    }
})

const getFoodList = ()=>{
    return async(dispatch)=>{
        dispatch(changefoodList([]));
    }
}

export const {changefoodList,changeCarList } = foodList.actions
export { getFoodList }

export default foodList.reducer