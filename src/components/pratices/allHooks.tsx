import { useId, useEffect, useState, useMemo, memo, useCallback, createContext, useContext, useReducer, useRef, forwardRef, useImperativeHandle } from "react"
import { Button } from "antd";
import Apppp from './highLevelHooks';
function App() {
    const id = useId(); // 可以用来生成唯一id
    const [count, setCount] = useState<number>(0);
    const [count2, setCount2] = useState<number>(0);
    // useref可以用来缓存一个值，它的变化不会造成组件重载，同样的，组件重载也不会重置它的值
    const num = useRef(0);
    const addCount = () => {
        num.current++
        setCount(num.current)
    }
    //返回的函数中可以用来消除副作用，也可以在组件销毁前用来清除组件之前的一些内存
    useEffect(() => {
        console.log('我在组件载入时和依赖项发生变化时都会触发！')
        console.log(count)
        return () => {
            console.log(count)
            console.log('我被销毁了')
        }
    }, [count])
    //useMemo计算属性 ,同样也可以缓存值，传入子组件时防止子组件重新渲染
    const countDouble = useMemo(() => count * 2, [count])
    //useCallback缓存函数，因为两个相同的函数是不相等的，会造成子组件重新渲染
    const clickSon = () => { console.log('我是父组件传给子组件的方法！') };
    const clickSon2 = useCallback(() => { console.log('我是父组件传给子组件的方法2！') }, []);
    return (<>
        <div id={id}>{count}</div>
        {countDouble}
        <Button onClick={addCount}>+</Button>
        <Son haha={clickSon2}></Son>
    </>)
}
//设置context的值
const contextValue = createContext();

//memo可以用来缓存组件，父组件更新时若子组件没有变化便不会重新渲染
const Son = memo(function Son({ haha }) {
    useEffect(() => {
        haha();
    }, [])
    console.log(1)

    // Reducer 一个集中状态管理工具，可以同时处理多种操作
    const wordReducer = (state, action) => {
        switch (action.type) {
            case 'add':
                return state + 'hello Son';
            case 'decrment':
                return state + 'hello';
            default:
                return state;
        }
    }
    const [word, wordDispatch] = useReducer(wordReducer, 'hellow World');

    return <>
        <div>{word}</div>
        <Button onClick={() => wordDispatch({ type: 'add' })}>add</Button>
        <Button onClick={() => wordDispatch({ type: 'decrment' })}>decrment</Button>

        {/* 讲contextValue.provider包裹所有需要注入值的组件 */}
        <contextValue.Provider value={123}>
            <LittleSon></LittleSon>
            <LittleSon></LittleSon>
            <LittleSon></LittleSon>
        </contextValue.Provider>
        <InputCom></InputCom>
    </>
})



function LittleSon() {
    //获取context的value
    const contextvalue = useContext(contextValue);
    return <>
        <div>我是小儿子{contextvalue}</div>
    </>
}

// forwardRef转变一个组件，这样可以在外界传入ref到内部，因此来操作内部组件的dom结构
const MyForwardRef = forwardRef(function MyForwardRef(props,ref) {
    useEffect(() => {
        // ref.current.focus();
        // ref.current.style.background   = 'green';
        console.log(ref.current);
    }, [])
    // useImperativeHandle用来管理暴露出去的ref dom 可以被如何操作，如果定义了函数，那么只能操作已经定义的函数，之前的原生方法将全部无效！！！！
    const ref2 = useRef(null);
    useImperativeHandle(ref,()=>{
        return {
            focus2(){
                ref2.current.style.background   = 'red';
            }
        }
    })


    return <>
        <input type="text" ref={ref2} />
    </>
})

function InputCom() {
    // ref可以用来操作dom
    const myRef = useRef(null);
    useEffect(() => {
        // myRef.current?.focus();
        // myRef2.current.style.background   = 'red';
        myRef2.current.focus2();
    }, [])
    const myRef2 = useRef(null);
    return <>
        <input type="text" ref={myRef} />
        <MyForwardRef ref={myRef2}></MyForwardRef>
        <Apppp></Apppp>
    </>
}






export default App;