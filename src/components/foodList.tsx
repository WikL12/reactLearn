import { useDispatch, useSelector } from "react-redux"
import { getFoodList , addToCarList ,decreaCarList , firstGetFoodList} from '../store/modules/foodStore'
import { useEffect } from "react";
const FoodComponent = () => {
    const dispatch = useDispatch();
    const { foodList , carList , allPrice} = useSelector(state => state.foodObject);
    const { count } = useSelector(state=>state.pricate);
    console.log(foodList)
    const addFoodList =()=>{
        dispatch(getFoodList([...foodList,...foodList]))
    }
    const addCarList = (x)=>{
        if(carList.findIndex(item=>item.id == x.id) == -1){
            dispatch(addToCarList(x));
        }else{
            console.log('已加入！')
        }
    }
    const deleteCarList = (x)=>{
        dispatch(decreaCarList(x));
    }
    useEffect(function(){
        dispatch(firstGetFoodList())
    },[])
    return (
        <>
        <button onClick={addFoodList}>add</button>
            {foodList.map(x => {
                return (
                    <>
                        <li>{x.name} <button onClick={()=>addCarList(x)}>加入购物车</button></li>
                    </>
                )
            })}


            购物车:{allPrice}
            {carList.map(x => {
                return (
                    <>
                        <li>{x.name} <button onClick={ ()=>deleteCarList(x)}>删除购物车</button></li>
                    </>
                )
            })}

            { count }
        </>
    )
}
export default FoodComponent