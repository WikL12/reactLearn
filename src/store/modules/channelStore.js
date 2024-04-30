import {createSlice} from '@reduxjs/toolkit'
import  axios  from 'axios'
const channelStore = createSlice({
    name:'channel',
    initialState:{
        channelList:[],
    },
    reducers:{
        setChannels(state,action){
            state.channelList = action.payload
        }
    }
})

// 封装一个新的函数 异步请求
const { setChannels} =  channelStore.actions;
const getChannelList = ()=>{
    return async (dispatch)=>{
        const res  = await axios.get('http://geek.itheima.net/v1_0/channels');
        dispatch(setChannels(res.data.data.channels));
    }
}

export { getChannelList }

const channelReducer  = channelStore.reducer;
export default channelReducer