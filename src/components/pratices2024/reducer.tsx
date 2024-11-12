import { useEffect, useReducer ,useMemo} from "react"
let theOriginState = [
    1,2,3,4,5
];

export default function App (){
    const [theState,dispatchState] = useReducer(reducerFunction ,theOriginState);

    useEffect(()=>{
        console.log("初始运行");
        return ()=>{
            console.log("组件卸载")
        }
    },[])

    const theOriginStateLength = useMemo(()=>theState.length,[theState]);

   
    function reducerFunction(state:Array<number>,action:any){
        switch(action.type){
            case 'add':
                return [...state,6];
            case 'remove':
                return state.filter((item,index)=>index !== 0);
            default:
                return state;
        }
    }

    function addState(){
        dispatchState({type: 'add'});
    }
    function removeState(){
        dispatchState({type: 'remove'});
    }
    return (
        <div>
            theState : {theOriginStateLength } 个
            <button onClick={addState}>add</button>
            <button onClick={removeState}>remove</button>

            <ul>
                {theState.map(x=>{
                    return <li >{x}</li>
                })}
            </ul>

        </div>
    )
}