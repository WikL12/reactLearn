// 导入创建切片的函数
import {createSlice} from '@reduxjs/toolkit'
// 导入请求工具函数
import request from '../../utils/request';
// 创建tokenStore切片，用于存储token
const tokenStore = createSlice({
    name: 'token',
    // 初始化tokenStore的状态，token为空
    initialState:{
        token:'',
    },
    // 定义tokenStore的reducer，用于设置token
    reducers:{
        setToken(state,action){
            state.token = action.payload
        }
    }
});


// 从tokenStore中获取setToken和getTokenByNet函数
const {setToken} = tokenStore.actions;

// 定义获取token的函数，通过网络
const getTokenByNet = ()=>{
    // 返回一个异步函数，参数为dispatch
    return async (dispatch)=>{
        // 调用request.post发起请求，参数为url
        const res = await request.post('xxxxxxx');
        // 调用setToken函数，设置token
        dispatch(setToken(res.data));
    }
}

// 导出setToken和getTokenByNet函数
export { setToken,getTokenByNet};

// 导出tokenStore的reducer
export default tokenStore.reducer;