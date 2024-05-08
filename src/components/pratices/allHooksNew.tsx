import { useId, useEffect, useState, useMemo, memo, useCallback, createContext, useContext, useReducer, useRef, forwardRef, useImperativeHandle } from "react"
import { Button, Input } from "antd";

export default function App() {
    const [text, setText] = useState<string>('');
    const key = useId() + new Date().getTime();
    const add = () => {
        setTodoList([...todoList, { text: text, id: key }]);
        setText('');
        inputRef.current.focus();

    }
    const deleteText = () => {
        inputRef.current.focus();
        setText('');
    }
    const [todoList, setTodoList] = useState<any[]>([]);
    interface myInterface {
        id: any
    }

    const deleteItem = (id: myInterface) => {
        console.log(id)
        let newList = todoList.filter(x => {
            return x.id != id
        })

        setTodoList(newList);
    }
    const [finshedlist, setFinshedlist] = useState<any[]>([]);
    const finshed = (id: myInterface) => {
        let newList = todoList.filter(x => {
            return x.id != id
        })
        setTodoList(newList);

        setFinshedlist([...finshedlist, todoList.find(x => x.id == id)]);
    }
    const unfinished = (id: myInterface) => {
        let newList = finshedlist.filter(x => {
            return x.id != id
        })
        setFinshedlist(newList);
        setTodoList([...todoList, finshedlist.find(x => x.id == id)]);
    }
    const inputRef = useRef(null);


    const allPlan = useMemo(() => todoList.length, [todoList])
    const [allFinshed, setAllFinshed] = useState<number>(0);
    useEffect(() => {
        setAllFinshed(finshedlist.length)
    }, [finshedlist])
    return <>
        <div className="mt-20 p-0 h-20  flex flex-col justify-center align-middle">
            <div className="p-0 h-20  flex  justify-center align-middle">
                <Input type="text" value={text} onChange={(e) => setText(e.target.value)} ref={inputRef} />
                <Button onClick={add}>增加</Button>
                <Button onClick={deleteText}>清空</Button>
            </div>

            <hr />
            <span>待完成</span>
            <ul>
                {todoList.map((item) => {
                    return <>
                        <li key={item.id}>{item.text}
                            <Button danger onClick={() => deleteItem(item.id)}>删除</Button>
                            <Button onClick={() => finshed(item.id)}>完成</Button>
                        </li>
                    </>
                })}
            </ul>
            <span>已完成</span>
            <ul>
                {finshedlist.map((item) => {
                    return <>
                        <li key={item.id} style={{ textDecoration: 'line-through' }}>{item.text}
                            <Button onClick={() => unfinished(item.id)}>未完成</Button>
                        </li>
                    </>
                })}
            </ul>

            <span>总计划数:{allPlan} 总完成数:{allFinshed}</span>
            <Child ></Child>
        </div>
    </>
}

const childContext = createContext();
function Child() {
    const [contextValue,setContextValue] = useState<string>('hello im child component context value');
    const changeContextValue = useCallback(() => {
        setContextValue(contextValue.split('').reverse().join(','));
    })
    return <>
        <h1>child</h1>
        <Button >新增字符串</Button>
        <childContext.Provider value={{value:contextValue,changeContextValue:changeContextValue}}>
            <LilleChild onchageContextValue={changeContextValue}></LilleChild>
        </childContext.Provider>
    </>
}


function reducerFunction(state, action) {
    switch (action.type) {
        case 'add':
            return state + 'hello';
        case 'reverse':
            return state.split('').reverse().join('');
        case 'decrement':
            return state.slice(0, 8);
        default:
            return state;
    }
}
const LilleChild = memo(function LilleChild({onchageContextValue}) {
    const contextValueFromChild = useContext(childContext);
    const [text, textdispatch] = useReducer(reducerFunction, 'little Child');
    const LilleChildRef = useRef(null);
    useEffect(() => {
    LilleChildRef.current.focus()
    // console.log(LilleChildRef.current)
    }, [])
    return <>
        <h1>{text}</h1>
        <span>{contextValueFromChild.value}</span>
        <Button onClick={()=>textdispatch({type:'add'})}>add</Button>
        <Button onClick={()=>textdispatch({type:'reverse'})}>reverse</Button>
        <Button onClick={()=>textdispatch({type:'decrement'})}>decrement</Button>
        <Button onClick={contextValueFromChild.changeContextValue}>changeContextValue</Button>
        <ForwardRefComponent ref={LilleChildRef} hello={'hello'}></ForwardRefComponent>
    </>
})



const ForwardRefComponent = memo(forwardRef(function ForwardRefComponent(props,ref){
    const contextValueFromChild = useContext(childContext);
    const myRef = useRef(null);
    useImperativeHandle(ref,()=>{
        return {
            focus(){
                console.log('focus')
            }
        }
    })
    return <>
        {/* <h1 ref={ref}>forwardRef</h1> */}
        <h1 ref={myRef}>forwardRef</h1>
        <h2>{props.hello}</h2>
        <h2>{contextValueFromChild.value}</h2>
        <Button onClick={contextValueFromChild.changeContextValue}>changeContextValue</Button>

    </>
}))