import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const pritice = createSlice({
    name: 'pritice',
    initialState:{
        count:0,
    },
    reducers:{
        addCount(state,action){
            state.count = action.payload;
        }
    }
})

const { addCount } = pritice.actions;

const getCountByNet = ()=>{
    return async(dispatch)=>{
        const res  = await axios.get('http://geek.itheima.net/v1_0/channels');
        dispatch(addCount(res.data.data.channels.length));
    }
}

export { addCount , getCountByNet} 
export default pritice.reducer;


