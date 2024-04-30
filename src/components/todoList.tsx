import { useState, useEffect, useRef} from 'react'
import { Input , Button} from 'antd';

const useInput = ()=>{ //自定义hook 吊吧，之后哪里都能用

    const inputRef = useRef(null);
    const [inputValue,setInputValue] = useState('');
    const [inputArray,setInputArray] = useState([]);
    useEffect(()=>{
        function toggle(){
        console.log('Todolist is loaded')

        };
        toggle();
    },[])
    const addInputValue = ()=>{
        setInputArray([...inputArray,inputValue]);
        setInputValue('')
    }
    return {
        inputValue,
        setInputValue,
        inputArray,
        setInputArray,
        inputRef,
        addInputValue
    }
}


const Todolist = ()=>{
   const {inputValue,setInputValue,inputArray,setInputArray,inputRef,addInputValue} = useInput();
    return (
        <>
            <Input placeholder="" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} ref={inputRef}/>
            <Button type='primary' onClick={addInputValue}>新增</Button>
            {inputArray.map((value)=>{
                return (
                    <li><span>{value}</span></li>
                )
            })}
        </>
    )
};
export default Todolist;