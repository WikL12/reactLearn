const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '400px',
    // height: '40px',
    marginBottom: '10px'
}
import { useState } from 'react';
import { Button } from 'antd';
import { Input } from "antd";
import { Segmented } from 'antd';
function App() {
    const [a, setA] = useState('');
    const [target, setTarget] = useState([]);
    const [segValue,setSegValue] = useState('未完成');

    function valueChange(e) {
        // console.log(e.target.value);
        setA(e.target.value);
    };
    function addToDoList() {
        if(a == '' || a == undefined) return;

        if(target.indexOf(a) != -1) return;

        setTarget([...target, {text:a,finished:false}]);
        setA('')
    }
    function deleteToDo(index:number) {
        console.log(index);
        let arr = target.slice();
        arr.splice(index, 1);
        setTarget(arr)
    }
    function finished(index:number) {
        let arr = target.slice();
        arr[index].finished = !arr[index].finished;
        setTarget(arr)
    }
    function segValueChange(value:string) {
        setSegValue(value);
    }
   
    return (
        <>
        待办事项
          <div style={style}>
          <Input placeholder="Basic usage" value={a} onChange={valueChange} />
          <Button type="primary"  style={{marginLeft:'10px'}} onClick={addToDoList}>新增</Button>
          </div>
          <Segmented options={['未完成', '已完成',]} value={segValue} onChange={segValueChange} block style={{marginBottom:'10px'}}/>
            <div>
                {/* {       
                        target.map((x, index) => {
                            return (
                                <div style={{...style,textDecoration: x.finished ? 'line-through' : 'none'}}><span>待办事项{index + 1}:</span>  
                                <div>
                                <span style={{textDecoration: x.finished ? 'line-through' : 'none'}}>{x.text}</span>
                                <Button type="primary" style={{marginLeft:'10px'}} onClick={(e)=>{finished(index)}}>{x.finished ? '未完成' : '完成'}</Button>
                                <Button type="dashed" style={{marginLeft:'10px'}} onClick={(e)=>{deleteToDo(index)}}>删除</Button>
                                </div>
                                </div>
                            )
                       
                    })
                } */}
            </div>
            <TodoList segValue={segValue} allArr={target} finished={finished} deleteToDo={deleteToDo}></TodoList>
        </>
    )
}
export default App;



function TodoList (props) {
    const {segValue,allArr,finished,deleteToDo} = props;
    let arr = allArr.filter(x=>x.finished == false);
    let arr2 = allArr.filter(x=>x.finished == true);
    if(segValue == '未完成'){
       return arr.map((x, index) => {
            return (
                <div style={{...style,textDecoration: x.finished ? 'line-through' : 'none'}}><span>待办事项{index + 1}:</span>  
                <div>
                <span style={{textDecoration: x.finished ? 'line-through' : 'none'}}>{x.text}</span>
                <Button type="primary" style={{marginLeft:'10px'}} onClick={(e)=>{finished(index)}}>{x.finished ? '未完成' : '完成'}</Button>
                <Button type="dashed" style={{marginLeft:'10px'}} onClick={(e)=>{deleteToDo(index)}}>删除</Button>
                </div>
                </div>
            )
       
    })
    }else{
        return  arr2.map((x, index) => {
            return (
                <div style={{...style,textDecoration: x.finished ? 'line-through' : 'none'}}><span>待办事项{index + 1}:</span>  
                <div>
                <span style={{textDecoration: x.finished ? 'line-through' : 'none'}}>{x.text}</span>
                <Button type="primary" style={{marginLeft:'10px'}} onClick={(e)=>{finished(index)}}>{x.finished ? '未完成' : '完成'}</Button>
                <Button type="dashed" style={{marginLeft:'10px'}} onClick={(e)=>{deleteToDo(index)}}>删除</Button>
                </div>
                </div>
            )
       
    })
    }
    
}