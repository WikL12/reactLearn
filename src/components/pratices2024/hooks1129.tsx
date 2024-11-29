import { Button, Input } from 'antd';
import { memo, useRef, useState, useMemo, useCallback, forwardRef, useEffect, useReducer, useDeferredValue, useTransition } from 'react';
export default function Appp() {
    const [state, setState] = useState(999);
    const ref = useRef(null);
    console.log(ref.current);
    const state2 = useMemo(() => {
        console.log(state)
        return String(state).length
    }, [state])
    const move = useCallback(function () {
        console.log('move');
    }, [])
    useEffect(() => {
        return () => {

        }
    }, [])
    return (
        <>
            <div ref={ref}>{state}</div>
            <Button onClick={() => setState((n) => n + 1)}>change states</Button>
            <MemoComponents divs={state2} move={move}></MemoComponents>
        </>
    )
}

const MemoComponents = memo(function (props) {
    console.log("MemoComponents")
    const textRef = useRef(null);
    return (<>
        <div onClick={props.move}>
            123
            {props.divs}
        </div>
        <Button onClick={() => console.log(textRef.current)}>get son ref dom</Button>
        <TextRef ref={textRef}></TextRef>
    </>)
})

const TextRef = forwardRef(function (props, ref) {
    const originalState = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    function handleFun(state, action) {
        switch (action) {
            case 'toggle':
                return state
        }
    };


    const [states2, dispatchStates2] = useReducer(handleFun, originalState);

    const [isPending, startTransition] = useTransition();

    const [one, setOne] = useState(1);
    function changeOne() {
        startTransition(() => {
            setTimeout(() => {
                setOne(2)
            }, 3000)
        })
    }
    const [inputValue,setInputValue] = useState('');
    const inputValueDefrred = useDeferredValue(inputValue);
    return (<>
        <div ref={ref}>textREf</div>
        {states2.map(x => {
            return <span key={x}>x</span>
        })}
        <Button onClick={changeOne}>change</Button>
        {isPending && <span>加载中</span>}
        <br />
        {one}

        <Input value={ inputValue} onChange={(e) => setInputValue(e.target.value)}></Input>
        <Lists value={inputValueDefrred}></Lists>
    </>)
})


    function Lists(props){
        return (
            <>
               {props.value}
            </>
        )
    }
