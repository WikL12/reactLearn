import { useState, useEffect, useId, useMemo } from "react";
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const List: React.FC = (props) => {
    const [a, setA] = useState('haha');
    const [b, setB] = useState([1, 2, 3, 4]);
    const changeB = (item, index) => {
        let a = b[index];
        a = a + 1;
        let newB = [...b];
        newB[index] = a;
        setB(newB);
    }
    useEffect(() => { //可以当监听属性，可以监听多个值，牛逼
        console.log(props)
        console.log('props has change!')
    }, [props.count]);
    const C = useMemo(() => { //相当于计算属性，依赖值可以为多个，牛逼
        let a = b.reduce((pre, prev) => {
            pre = pre + prev
            return pre
        });
        return a + props.count
    }, [b, props.count])

    const navigate = useNavigate();
    return (
        <>
            <div >{a}</div>
            <Link to="/list">跳转到/list</Link>
            <div onClick={() => navigate('/todolist')}>跳转到todoList</div>
            <span>{props.hello}</span>
            <ul>
                {b.map((a, index) => (
                    <li key={useId()}>
                        <Button onClick={() => { changeB(a, index) }} >{a}</Button>
                    </li>
                ))}
            </ul>
            <span>{C}</span>
        </>

    )


};
export default List;