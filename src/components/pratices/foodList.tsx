import { Button } from "antd";
import { useMemo, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
const FoodList = ()=>{
    const dispatch = useDispatch();
    const foodlistInStore = useSelector(state=>state.foodList);
    const carlistInStore = useSelector(state=>state.carList);
    const [foodList,setFoodList] = useState<any[]>([
        { name:1 },
        { name:2 },
        { name:3 },
        { name:4 },
        { name:5 },
    ]);
    const clickFood = (x)=>{
        alert(x)
        setGoodsCar([...goodsCard,x]);
    }
    const delectFood = (x)=>{
        alert(x)
        setGoodsCar(goodsCard.filter(y=>y.name!==x.name));
    }
    const [goodsCard,setGoodsCar] = useState<any[]>([]);

    const allMoney = useMemo(()=>{
        return goodsCard.reduce((x,y)=>x+y.name,0);
    },[goodsCard]);
    return <>
        <div>this is a list for food</div>
        <ul>
            {foodList.map(x=><>
            <li>{x.name} <Button onClick={()=>clickFood(x)}>加入购物车</Button></li>
            </>)}
        </ul>
        <div>
            this is a list for goodsCar
        </div>
        <ul>
        {goodsCard.map(x=><>
            <li>{x.name} <Button onClick={()=>delectFood(x)}>删除</Button></li>
            </>)}
           
        </ul>
        总价：{allMoney}
        </>
}

export default FoodList;