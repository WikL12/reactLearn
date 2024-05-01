import { Button } from "antd";
interface  TodoItemProp {
    item: string,
    index: number,
    deleteItem: Function
    children?: React.ReactNode
};
const todoItem = (prop:TodoItemProp) => {
        return (
            <div className="todoItem" key={prop.index}>{prop.item} <Button danger onClick={()=>prop.deleteItem(prop.index)}>删除</Button></div>
        )
}

export default todoItem;