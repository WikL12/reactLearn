import { startTransition, useRef, useTransition, useDeferredValue, useState, useEffect } from "react";
import { Button } from "antd";
import { flushSync } from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
function App() {
    const [count, setCount] = useState([])
    const [count2, setCount2] = useState([])
    const [pending, startTransition] = useTransition();
    // 创建一个跟count相同的，但是在count修改完成后才渲染的值
    const slowCount = useDeferredValue(count)
    const num = useRef([]);
    const addCount = () => {
        for (let i = 0; i < 100; i++) {
            num.current.push(i);
        }
        setCount(num.current);
        // setCount优先执行，执行完毕后，再执行setCount2，不阻塞UI渲染
        // startTransition执行开始时，pending为true，结束后，pending为false
        startTransition(() => setCount2(num.current))

    }
    const asd = (m) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(m)
            }, 1000)
        })
    }
    const addCount2 = () => {
        // 立即刷新dom，类似Vue的 nextTick
        flushSync(() => {
            setCount(count + 1);
        })
    }
    useEffect(() => {
        async function a() {
            try {
                let data = await asd(100);
                console.log(data)
            } catch (err) {
                console.log(err)
            }
            console.log('------')
        };
        a();
    }, [])



    return <>
        {/* <div>{count}</div> */}
        {count2.map((x) => <>
            <ul>
                <li key={x}>{x}</li>
            </ul>
        </>)}
        <Button onClick={addCount}>+100</Button>
        {pending && <div>正在渲染</div>}


        {/* <ErrorBoundary fullback={<div>123</div>}>
            错误边界组件，当发生错误时，界面显示fullback的内容而不是满屏错误
        </ErrorBoundary> */}
    </>
}


export default App;