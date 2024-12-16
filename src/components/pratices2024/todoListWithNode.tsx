import { useState, useMemo, useEffect, useId } from "react";
import { Button, Input, Checkbox } from "antd";

async function queryDataByFetch(methods, url, params,) {
    let newUrl = url;
    if (methods == 'GET' && params) {
        Object.entries(params).forEach(([key, value], index) => {
            newUrl += `${index === 0 ? '?' : '&'}${key}=${value}`;
        })
    }
    const respose = await fetch(newUrl, {
        method: methods,
        headers: { 'Content-Type': methods === 'GET' ? 'application/x-www-form-urlencoded' : "application/json", },
        body: methods == 'GET' ? undefined : JSON.stringify(params),
    });

    return respose.json();
}

export default function Appp() {
    const [content, setContent] = useState("");
    const [toDoList, setTodoList] = useState([]);

    useEffect(() => {
        getList();
    }, [null]);
    function getList() {
        queryDataByFetch('POST', 'http://localhost:3000/getList', {}).then((res) => {
            console.log(res);
            if (res.status == 200) {
                setTodoList(res.result);
            }
        })
    }
    function addToDoList() {
        // console.log(value)
        const todoItem = {
            description: content,
            isFinished: false,
            addTime: new Date().toLocaleString(),
            id: new Date().getTime(),
        }
        queryDataByFetch('POST', 'http://localhost:3000/addList', { todoList: [...toDoList, todoItem] }).then(res => {
            getList();
            setContent("");
        });
    };
    function deleteList(id) {
        queryDataByFetch('POST', 'http://localhost:3000/deleteList', { id: id }).then(res => {
            getList();
        });
    }
    function finisheditems(e, id) {
        console.log(e.target.checked, id);
        queryDataByFetch('POST', 'http://localhost:3000/finisheditems', { id: id, isFinished: e.target.checked }).then(res => {
            getList();
        })
    }


    const canClick = useMemo(() => content.length > 0, [content]);
    return (
        <>
            This is a nodejs App

            <div className='w-full  flex justify-between mt-10px items-center '>
                <Input value={content} onChange={(e) => setContent(e.target.value)}></Input>
                <Button disabled={!canClick} onClick={addToDoList}>添加</Button>
            </div>
            待办事项<br />
            <ul>
                {
                    toDoList.map((item, index) => {
                        return (
                            <>
                                <div className='rounded-lg border border-stone-300 p-3'>
                                    <div key={index} className="w-500px  flex justify-between  items-center">
                                        <Checkbox checked={item.isFinished} onChange={e => finisheditems(e, item.id)}></Checkbox>
                                        内容:{item.description}
                                    </div>
                                    <hr />
                                    <div className="w-500px  flex justify-between  items-center">  预计完成时间:{item.addTime}
                                        <Button onClick={() => deleteList(item.id)}>删除</Button>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </ul>
        </>
    )
}
