import { useSelector, useDispatch } from "react-redux"
import { inscrement, decrement } from '../store/modules/counterStore';
import { getChannelList } from '../store/modules/channelStore';
import { Button } from 'antd';
import { useEffect } from "react";
const ReduxTest = () => {
    const dispatch = useDispatch();
    const { count } = useSelector(state => state.counter);
    const { channelList } = useSelector(state => state.channelList);
    const addCount = () => {
        dispatch(inscrement())
    }
    useEffect(()=>{
        dispatch(getChannelList())
    },[])
    return (
        <>
            <div>{count}</div>
            <Button onClick={addCount}>+count</Button>
            <Button onClick={()=>{ dispatch(decrement(100))}}>-count</Button>
            {channelList.map((item)=>{
                return <li key={item.id}><span>{item.name}</span></li>
            })}
        </>
    )
}
export default ReduxTest