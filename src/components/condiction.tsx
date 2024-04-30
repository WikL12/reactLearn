import { useState, useEffect, useId, useMemo } from "react";

const isShow = (show)=>{
    if(show){
        return (<div>show === true (function)</div>)
    }else{
        return (<div>show === false (function)</div>)

    }
}

const Condiction = () => {
    const [show, setShow] = useState(true);
    return (
        <>
            <div>123</div>
            {
                show && <div>345</div>
            }
            {show ? <div>show === true</div> : <div>show === false</div>}
            {isShow(show)}
        </>
    )
};
export default Condiction;