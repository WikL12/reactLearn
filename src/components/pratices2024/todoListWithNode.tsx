import { useState ,useMemo,useEffect} from "react";
import {Button,Input,Checkbox} from "antd";

async function queryDataByFetch(methods,url,params,){
    let newUrl = url;
    if(methods == 'GET' && params){
        Object.entries(params).forEach(([key,value],index)=>{
            newUrl += `${index === 0 ? '?' : '&'}${key}=${value}`;
        })
    }
    const respose = await fetch(newUrl,{
        method:methods,
        headers: {'Content-Type': 'application/json'},
        body: methods == 'GET' ? undefined : JSON.stringify(params),
    });

    return respose.json();
}

export default function Appp(){
    const [content,setContent] = useState("");
    const [toDoList,setTodoList] = useState([]);

    useEffect(() =>{
        queryDataByFetch('POST','http://localhost:3000/getList',{}).then((res)=>{
            console.log(res)
        })
    },[null]);

    function addToDoList(){
        // console.log(value)

        setTodoList([...toDoList,content]);
        setContent("");
        console.log(toDoList)   
    }
    const canClick = useMemo(()=>content.length>0,[content]);
    return (
        <>
            This is a nodejs App

            <Input value={content} onChange={(e)=>setContent(e.target.value)}></Input>
            <Button disabled={!canClick} onClick={addToDoList}>添加</Button>
             待办事项<br />
            <ul>
                {
                    toDoList.map((item,index)=>{
                        return (
                            <>  
                                <li key={index}>
                                <Checkbox value={item} ></Checkbox>
                                内容:{item}
                                完成时间:{new Date().toLocaleString()}
                                </li>
                            </>
                        )
                    })
                }
            </ul>
        </>
    )
}