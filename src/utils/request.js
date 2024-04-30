// axios的封装处理
import { getToken } from './tokenMethods';
import axios from 'axios';

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000,
})

// 添加请求拦截器
// 可以在请求发送之前，做拦截，插入一些自定义的配置
request.interceptors.request.use((config)=>{
    const token = getToken();
    if(token) {
        return config.headers.Authorization = token;
    }
    return config
},(error)=>{
    return Promise.reject(error)
})

// 添加相应拦截器
// 在请求接收到返回值之后，做拦截，处理数据
request.interceptors.response.use((response)=>{
    // 2xx 内的状态码都会触发该函数
    return response.data
},(error)=>{
    // 超出2xx的状态码都会触发该函数
    return Promise.reject(error)
});


export  default request