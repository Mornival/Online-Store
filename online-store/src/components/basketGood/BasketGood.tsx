import { IProduct } from "../../types/types";
import React, { useState , useContext} from 'react';
import { DescriptionContext } from "../context/OtherContexts";
import './BasketGood.scss'
interface PropsProduct{
    product: IProduct
}

function BasketGood(props: PropsProduct){
    let { setDescrition } = useContext(DescriptionContext);
    const clickImage = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log(e);
        if(setDescrition) setDescrition();
    }
    const [numberOfGoods, setNumberOfGoods] = useState(1);
    return(
        <div className = "good-body">
            <div className="good-id">{props.product.id}</div>
            <div className = "good-image" onClick={clickImage}>
                <img src = {props.product.images[0]} alt = "good"/>
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
                    <div className = "good-amount__plus" onClick={function(){if(numberOfGoods !== props.product.stock) setNumberOfGoods(numberOfGoods + 1)}}>+</div>
                    <h2 className = "good-amount__amount">{numberOfGoods}</h2>
                    <div className = "good-amount__minus" onClick={function(){if(numberOfGoods > 1) setNumberOfGoods(numberOfGoods - 1)}} >-</div>
                </div>
                <h2 className = "money-price">€{props.product.price * numberOfGoods}</h2>
            </div>
        </div>
    )
}

export default BasketGood