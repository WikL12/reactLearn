import { useDispatch, useSelector } from "react-redux"
import { addCount , getCountByNet} from "../store/modules/pricate";
import { Button} from 'antd'
import { useEffect, useMemo } from "react";


const Pricate = ()=>{
    const dispath = useDispatch();
    useEffect(()=>{
        dispath(getCountByNet());
    },[])
    const { count } =  useSelector(state=>state.pricate);
    const count2 = useMemo(()=>{
        return count
    },[count])
    return (
        <>
            <div>{count}</div>
            <div>{count2}</div>
            <Button type="primary" onClick={()=>dispath(addCount(count+1))}>add Count</Button>
        </>
    )
}
export default Pricate