import { Navigate } from "react-router-dom";

import {getToken} from '../utils';

const HighLevelRoute = ({children})=>{
    const token = getToken();
    if(token){
        return <>{children}</>
    }else{
        return <Navigate to={'/login'}></Navigate>
    }
}
export default HighLevelRoute

// 这里使用的是高阶函数的概念，将组件作为参数传入，然后再进行渲染
// 如果有token，就渲染传入的组件，如果没有就去登录页面