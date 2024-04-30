import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'antd';

import  List  from './components/list';
import Condiction from './components/condiction';
import Todolist from './components/todoList';
import ReduxTest from './components/redux';
import Pricate from './components/pricate.tsx';

function App() {
  const [count, setCount] = useState<number>(0)
  const addCount = () => {
    setCount(count + 1)
  }
  useEffect(() => {
    console.log('I am load!')
  }, undefined);
  useEffect(() => {
    if(count === 0){
      return
    }
    console.log('count has changed!');
  },[count]);

  return (
    <>
     
      <h1 >Vite + React</h1>
      {/* <Pricate/> */}
      {/* <Todolist /> */}
      {/* <ReduxTest/> */}
      {/* <div className="card">
        <Button onClick={addCount} type="primary">
          count is {count}
        </Button>
        </div> */}
      {/* <List hello={'adasd'} count={count}/> */}
      {/* <Condiction /> */}
    </>
  )
}

export default App
