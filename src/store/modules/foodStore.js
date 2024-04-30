import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const foodStore = createSlice({
    name:'foodObjet',
    initialState:{
        foodList:[
            {name:'a',id:1},
            {name:'b',id:2},
            {name:'c',id:3},
            {name:'d',id:4},
            {name:'e',id:5},
        ],
        carList:[
            {name:'a',id:1},
            {name:'b',id:2},
        ],
        allPrice:0,
    },
    reducers:{
        getFoodList(state,action){
            state.foodList = action.payload
        },
        addToCarList(state,action){
            state.carList = [...state.carList,action.payload];
            state.allPrice = state.carList.reduce((a,b)=>{
                console.log(a)
                return Number(a+b.id);
            })
        },
        decreaCarList(state,action){
            state.carList = state.carList.filter(x=>x.id != action.payload.id); 
        },
    }
});


const { getFoodList , addToCarList ,decreaCarList} = foodStore.actions;

const firstGetFoodList = ()=>{
    return async function(dispatch){
        const res  = await axios.get('http://geek.itheima.net/v1_0/channels');
        dispatch(getFoodList(res.data.data.channels));
    }
}


const foodReducer = foodStore.reducer;

export { getFoodList, addToCarList , decreaCarList , firstGetFoodList};
export default foodReducer;