import { IProduct } from "../../types/types";
import { useState , useContext, useEffect} from 'react';
import './BasketGood.scss';
import contextCart from "../context/contextCart";
import { ICard } from "../../types/types";
import { Link } from 'react-router-dom';
import { deleteInIndex } from "./deleteInIndex";
import { findIndex } from "./findIndex";
interface PropsProduct{
    product: IProduct,
    productId: number,
    id: number,
    number: number
}
function BasketGood(props: PropsProduct): JSX.Element{
    const [dataId, setDataId] = useState<number>(0);
    const { dataCart, setDataCart} = useContext(contextCart);
    const addInCart = function(): void{
        const arr: ICard[] = [...dataCart];
        let numberOfGood: number = 0;
        numberOfGood = findIndex(arr,dataId);
        if(numberOfGood !== -1){
            arr.push(arr[numberOfGood]);
        }
        localStorage.setItem('dataCart',JSON.stringify(arr));
        setDataCart(arr);
    }
    useEffect(function(){
        setDataId(props.product.id);
    },[dataCart]);
    const minusInCart = function(): void{
        const arr: ICard[] = [...dataCart];
        let numberOfDeleted: number = 0;
        let arrb: ICard[] = [];
        numberOfDeleted = findIndex(arr,dataId);
        if(numberOfDeleted !== -1){
            arrb = deleteInIndex(arr,numberOfDeleted);
        }
        localStorage.setItem('dataCart',JSON.stringify(arrb));
        setDataCart(arrb);
    }
    return(
        <div className = "good-body">
            <div className="good-id">{props.id + 1}</div>
            <div className = "good-image">
                <Link to = {`/details/${props.productId}`}><img src = {props.product.thumbnail} alt = "good"/></Link>
            </div>
            <div className = "good-info">
                <h2>{props.product.title}</h2>
                <p>{props.product.description}</p>
                <div className = "good-info__rat-dis">
                    <p>Rating: {props.product.rating}</p>
                    <p>Discount: {props.product.discountPercentage}%</p>
                </div>
            </div>
            <div className = "good-other-info">
                <h2 className = "good-other-info__h2">Stock: {props.product.stock}</h2>
                <div className="good-amount">
                    <div className = "good-amount__plus" onClick={addInCart}>+</div>
                    <h2 className = "good-amount__amount">{props.number}</h2>
                    <div className = "good-amount__minus" onClick={minusInCart} >-</div>
                </div>
                <h2 className = "money-price">€{props.product.price * props.number}</h2>
            </div>
        </div>
    )
}
export {deleteInIndex, findIndex};
export default BasketGood;