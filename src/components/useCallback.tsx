// useCallback 的 作用是缓存函数
// 相比于useMemo 缓存值不一样  useMemo是为了在组件不断更新的时候避免重复计算一个值
// 当我们把一个函数当做props传递给子组件时，由于函数是引用类型，所以就算设置了memo缓存组件，也是会更新的
// useCallback可以缓存这个函数，然后让组件继续实现缓存的效果

import { useCallback } from "react"


const father = ()=>{
    const onchange = useCallback(()=>{
        alert(1);
    },[]);
    return (
        <>
            <div></div>
            <Son onchange={onchange}></Son>
        </>
    )
}


const Son = ({onchange})=>{
    return (
        <>
            <div onClick={onchange}></div>
        </>
    )
}
export default father