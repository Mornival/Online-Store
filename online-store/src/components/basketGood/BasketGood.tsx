import { IProduct } from "../../types/types";
import React, { useState , useContext, useEffect} from 'react';
import { DescriptionContext } from "../context/OtherContexts";
import './BasketGood.scss';
import contextCart from "../context/contextCart";
import { ICard } from "../../types/types";
import { Link } from 'react-router-dom';
interface PropsProduct{
    product: IProduct,
    productId: number,
    id: number,
    number: number
}

function BasketGood(props: PropsProduct){
    const [dataId, setDataId] = useState<number>(0);
    let { setDescrition } = useContext(DescriptionContext);
    const { dataCart, setDataCart} = useContext(contextCart);
    const clickImage = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(setDescrition) setDescrition();
    }
    const addInCart = function(){
        const arr: ICard[] = [...dataCart];
        let numberOfGood: number = 0;
        for(let i: number = 0; i < arr.length; i++){
            if(dataId === arr[i].objProduct.id){
                numberOfGood = i;
                break;
            }
        }
        arr.push(arr[numberOfGood]);
        localStorage.setItem('dataCart',JSON.stringify(arr));
        setDataCart(arr);
    }
    useEffect(function(){
        setDataId(props.product.id);
    },[dataCart]);
    const minusInCart = function(){
        const arr: ICard[] = [...dataCart];
        let numberOfDeleted: number = 0;
        let arrb: ICard[] = [];
        for(let i = arr.length - 1; i >= 0; i--){
            if(dataId === arr[i].objProduct.id){
                numberOfDeleted = i;
                break;
            }
        }
        arrb = arr.filter((product , index)=>{
            if(index === numberOfDeleted){
                return false;
            }
            return true;
        })
        localStorage.setItem('dataCart',JSON.stringify(arrb));
        setDataCart(arrb);
    }
    return(
        <div className = "good-body">
            <div className="good-id">{props.id + 1}</div>
            <div className = "good-image" onClick={clickImage}>
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

export default BasketGood