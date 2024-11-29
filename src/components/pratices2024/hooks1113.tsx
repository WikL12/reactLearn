import { forwardRef, memo, startTransition, useEffect, useMemo, useReducer, useRef, useState, useTransition } from "react"
import { Button } from "antd"
import { useDispatch , useSelector} from "react-redux";
import{  addCount,decreamentCount ,setCountBySync}  from '../../store/modules/20241119Redux'
import{  addArray,getReduxStoreNew }  from '../../store/modules/2024111902Redux'

export default function App(){
    const [state,setState] = useState(0)
    const [isLoading,startTransition] = useTransition();
    function addCount(){
        // setState((state)=>state+1)
        startTransition(()=>{
            setTimeout(()=>{
                setState((state)=>state+1)
            },1000)
        })
    }
    
    useEffect(()=>{
        console.log('组件加载了')
        return ()=>{
            console.log('组件卸载了')
        }
    },[])

    useEffect(()=>{console.log('state 变化了')},[state])

   const stateChangeTimes =  useMemo(()=>{
        console.log('useMemo检测到：state 变化了')
        return (()=>state)()
    },[state])

    const [AppSon2State,setAppSon2State] = useState(0);
    
    return <>
        {state}
        {!isLoading && <div>加载中</div>}
        <Button type='primary' onClick={addCount}>add</Button>
        <hr/>
        state变化次数:{stateChangeTimes}
        <AppSon a= {1}></AppSon>
        <AppSon2 b={AppSon2State}></AppSon2>
        <MyReducer></MyReducer>
        <TestStoreData></TestStoreData>
    </>
}




const AppSon = memo(({a,children})=>{
    const refDom = useRef(null);
    console.log('我如果被缓存了，那么就不会打印出这个消息');
    function clickDiv(e){
        console.log(e);
        console.log('点击了div')
    }
    refDom.current?.addEventListener('click',clickDiv)
    return <>
        <div ref={refDom}>
            我是子组件AppSon
        {children}
        </div>
        
    </>
}) 

const AppSon2 = memo(({b})=>{
    // 缓存组件的children是不能够忽略的，因为它本质上是一个obj，而每次给到的obj都是不同的，所以每次渲染都会重新渲染
    console.log('我如果被缓存了，那么就不会打印出这个消息');
    const AppSon3Ref = useRef(null);
    console.log(AppSon3Ref)
    
    function ondivclick(index){
        console.log(index)
        console.log(AppSon3Ref.current)
    }
    return <>
        <div>
            我是子组件AppSon2
        {/* {props.children} */}
        </div>
        <Button onClick={()=>{console.log(AppSon3Ref)}}>点击</Button>
        {/* 通过将方法传递给子组件，并且让子组件自己调用的方式，可以获取子组件的数据 */}
        <AppSon3 ondivclick={ondivclick} ref={AppSon3Ref}></AppSon3>
    </>
})

const AppSon3 = forwardRef((props,ref: React.ForwardedRef<HTMLDivElement>)=>{
    const [myState,setMyState] = useMyhook();
    return <>
    {myState}
    <Button onClick={()=>{setMyState(myState+1)}}>click</Button>
        <div onClick={()=>{props.ondivclick(1)}} ref={ref}>我是forwordRef组件，我可以将我的dom让我的父组件获取到</div>
    </>
})


    // 自定义hook的意义：
    // 将一些可以重复使用的逻辑抽离出来，自定义hooks一般返回的是各种状态或者方法
    function useMyhook(){
        const [state,setState] = useState(0);
        useEffect(()=>{
            console.log('自定义hook中的state改变了')
        },[state])
        return [state,setState]
    }




    function MyReducer(){
        const [state,dispatch] = useReducer(fun,[1,2,3,4,5,6])

        function fun(state:Array<any>,action:any){
            switch(action.type){
                case 'add':
                    return [...state,action.value];
                case 'delete':
                    return state.filter((x,index)=>index != action.value);
            }
        }

        return (
            <>
            <div>myReducer</div>
            {state.map((item,index)=>{
                return <div key={index}>{item}
                <Button onClick={()=>{dispatch({type:'add',value:10})}}>add</Button>
                <Button onClick={()=>{dispatch({type:'delete',value:index})}}>delete</Button></div>

            })}
        </>
        )
       
    }



    function TestStoreData(){
        const storeCount = useSelector((state)=>state.reduxStore.count);
        const storeArray = useSelector(getReduxStoreNew);
        const dispathStoreAction = useDispatch();
        return (
            <>  
            {/* <Button onClick={()=>{dispathStoreAction(addCount(storeCount))}}>+</Button>
            <Button onClick={()=>{dispathStoreAction(decreamentCount(storeCount))}}>-</Button>
            <Button onClick={()=>{dispathStoreAction(setCountBySync())}}>超级加倍</Button>
                <div>{storeCount}</div> */}

            {storeArray}
            <Button onClick={()=>{dispathStoreAction(addArray(storeArray))}}>+</Button>
            {/* {storeArray.map(x=>{
                return <div key={x}>{x}</div>
            })} */}
            </>
        )
    }