import { Button } from "antd";
const todoItem = (prop) => {
        return (
            <div className="todoItem" key={prop.index}>{prop.item} <Button danger onClick={()=>prop.deleteItem(prop.index)}>删除</Button></div>
        )
}

export default todoItem;