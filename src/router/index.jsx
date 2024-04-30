import { createBrowserRouter, createHashRouter } from 'react-router-dom'; //history模式和hash模式
import List from '../components/list';
// import Todolist from '../components/todoList';
import NotFound from '../components/notFound';
import FoodComponent from '../components/foodList';
import HighLevelRoute from '../components/highLevelRoute'; //路由拦截件
import { memo } from 'react';
const MemoList = memo(<List></List>); // 缓存组件，可以跳过渲染
import App from '../App';
import { Suspense, lazy } from 'react';
const Todolist = lazy(()=>import('../components/todoList')) // 路由懒加载






import Todo from '../components/pratices/todolist';


const router = createBrowserRouter([

  {
    path: '/',
    // element: <HighLevelRoute><NotFound></NotFound></HighLevelRoute>,
    element: <Todo></Todo>,
    children: [
      {
        index: true,  //默认二级路由
        element: <MemoList></MemoList>, // 缓存组件，允许父组件更新时它不更新
      },
      {
        path: 'board',
        element: <Suspense><Todolist></Todolist></Suspense>, // 路由懒加载
      }
    ]
  }, {
    path: '/list',
    element: <List></List>,
  },
  {
    path: '/todoList',
    element: <Todolist></Todolist>,
  },
  {
    path: '*',
    element: <NotFound></NotFound>,
  },
])

export default router