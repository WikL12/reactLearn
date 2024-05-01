import  "./index.less";
import { Input, Button } from "antd";
import { useState, useRef, useEffect, useMemo } from "react";
import TodoItem from "./todoItem";
const TodoList = () => {
    const [todoValue, setTodoValue] = useState<string>('');
    const [todoList, setTodoList] = useState<string[]>([]);
    const inputRef = useRef<any>(null);
    const valueChange = (e: any) => {
        setTodoValue(e.target.value);
        console.log(e);
        console.log(inputRef);
    }
    const addTodo = () => {
        setTodoList([...todoList, todoValue]);
        setTodoValue('');
        inputRef.current.focus();
    }

    const deleteItem = (index: number) => {
        const newList = [...todoList];
        newList.splice(index, 1);
        setTodoList(newList);
    }

    useEffect(() => {
        console.log('useEffect');
    }, [])

    useEffect(() => {
        console.log('todoValue has change!');
    }, [todoValue])


    const a = useMemo(() => {
        return todoValue
    }, [todoValue])

    return (
        <>
            TodoList :    {a}
            <div style={{ display: 'flex' }}>
                <Input value={todoValue} onChange={(e) => { valueChange(e) }} ref={inputRef}></Input>
                <Button type="primary" onClick={addTodo}>添加</Button>
            </div>

            {todoList.map((item, index) => {
                // return <div className="todoItem" key={index}>{item} <Button danger onClick={()=>deleteItem(index)}>删除</Button></div>
                return <TodoItem  index={index} item={item} deleteItem={deleteItem}> </TodoItem>
            })}
        </>
    )
}
export default TodoList;


