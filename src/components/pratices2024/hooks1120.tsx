    import { useEffect, useMemo, useState ,useReducer ,memo, useCallback, useTransition , useRef, forwardRef} from "react";
    import { Button ,Input} from "antd";

    import { useSelector, useDispatch } from "react-redux";
    import {getList, addList } from "../../store/modules/redux1120";
    export default function Appp(){
        const [time,setTime] = useState(null);
        const [isPending,startTransition] = useTransition();

        function getTime(){
            startTransition(()=>{
                setTimeout(()=>{
                    setTime(new Date().toLocaleTimeString())
                },1000)
            })
        }
        const articalStyle = {
           display:'flex',
           justifyContent: 'space-between',
        }
        const articalArray2 = [
            {text:123,description:'ajskhdjkahjksdhjkahsjkd',id:1},
            {text:345,description:'sskjkdljklasjkljdkjasd',id:2},
        ]
        const [articalArray,setArticalArray] = useState(articalArray2);
        const [title,setTitle] = useState('');
        const [description,setDescription] = useState('');
        function addArtical(){
            setArticalArray([...articalArray,{
                text:title,
                description:description,
                id:articalArray.length+1
            }]);
            setTitle('');
            setDescription('');
        }
        const articalNumber = useMemo(()=>articalArray.length,[articalArray])
        useEffect(()=>{
            console.log('初始化')
            return ()=>{
                console.log('卸载')
            }
        },)
        useEffect(()=>{
            console.log('articalArray变化')
        },[articalArray])

        const memoFunction = useCallback(function memoFunction(){
            console.log('我是传递给secondComponent的方法，我必须要被缓存！')
        },[]) 

        return (
            <>
                <div>123</div>
                <div>now time is {time}</div>
                <Button onClick={getTime}>getTime</Button>
                <hr />
                    <Input value={title} onChange={(e)=>{setTitle(e.target.value)}}></Input>
                    <Input value={description} onChange={(e)=>{setDescription(e.target.value)}}></Input>
                    <Button onClick={addArtical}>添加</Button>
                    <div>文章数量:{articalNumber}</div>
                {articalArray.map((item)=>{
                    return (
                        <div key={item.id} style={articalStyle}>
                            <span>文章标题:{item.text}</span>
                            <span>文章描述:{item.description}</span>
                            <Button onClick={()=>{setArticalArray(articalArray.filter(x=>x.id!==item.id))}}>删除</Button>
                        </div>
                    )
                })}
                {/* SecondComponent是一个缓存组件，除了本身被缓存之外，传递给它的各种props和children都必须做缓存处理！ */}
                <SecondComponent memoFunction={memoFunction}></SecondComponent>
            </>
        )
    }



    const  SecondComponent = memo(function (props){
        const [count,dispathcount] = useReducer(reducerfun,1);
        function reducerfun(state,action){
            switch(action.type){
                case 'add':
                    return state+1;
                case 'minus':
                    return state-1;
            }
        }
        console.log('监测是否被缓存，会则不会显示这条信息')
        console.log(props)
        return (
            <>
                 <div>second component</div>
                 {count}
                 <Button onClick={()=>{dispathcount({type:'add'})}}>+</Button>
                 <Button onClick={()=>{dispathcount({type:'minus'})}}>-</Button>
                 <Button onClick={()=>{props.memoFunction()}}>测试传入的方法是否缓存成功！</Button>
                 <ThirdComponent></ThirdComponent>
            </>
        )
    })



    const ThirdComponent = function (props){
        const ref=useRef(null);
        const refForFourth = useRef(null);
        console.log(ref.current);
        return (
            <>
                 <div ref={ref}>third component</div>
                 <Button onClick={()=>{console.log(ref.current)}}>ref</Button>
                 <ForthComponent ref={refForFourth}></ForthComponent>
                 <Button onClick={()=>{console.log(refForFourth.current)}}>获取forth组件的ref</Button>
            </>
        )
    }

    //forwardRef 接收一个ref传参，绑定到组件内的dom结构上，这样可以让父组件获取到子组件的dom结构
    const ForthComponent = forwardRef(function (props,ref){
        const [satateInHooks,addState] = useCusHook();
        const dispatch = useDispatch();
        const list = useSelector(getList);
        return (
            <>
                 <div>forth component</div>
                 <div>{satateInHooks}</div>
                 <Button onClick={addState}>add</Button>
                 <div ref={ref}>我是forwordRef组件，我可以将我的dom让我的父组件获取到</div>

                 <div>{list}</div>
                 <Button onClick={()=>dispatch(addList())}>dispatch store action</Button>
            </>
        )
    })


    // 自定义hook

    function useCusHook(){
        const [state,setState] = useState(0);
       
        function add(){
            setState(state+1)
        }
        useEffect(() =>{
            console.log('useCusHook listening')
        },[state])
        return [state,add]
    }



