import {useState, useEffect} from 'react';
import './mainProductsItem.scss';

interface ICard {
    key?: number,
    title: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    widthCard:number,
    updateCountCart:(added:boolean)=>void
}

const MainProductsItem = ({ title, price, discountPercentage, rating, stock, brand, category, thumbnail, widthCard, updateCountCart }: ICard) => {
   const [buttonState, setButtonState] = useState(true);
   const boxShadow = buttonState ? 'none' : '0 0 25px wheat';
   

   function onAddCart() {
        setButtonState(buttonState => !buttonState);
        updateCountCart(buttonState);
   }

    return (
        <div style={{
            'backgroundImage': `url('${thumbnail}')`,
            'width': `${widthCard}px`,
            'boxShadow': `${boxShadow}`
            }} className="card">
            <div className="card__title">{title}</div>
            <div className="card__data">
                <div>Category:  <span>{category}</span></div>
                <div>Brand:  <span>{brand}</span></div>
                <div>Price:  <span>{price}</span></div>
                <div>Discount:  <span>{discountPercentage}</span></div>
                <div>Rating:  <span>{rating}</span></div>
                <div>Stock:  <span>{stock}</span></div>
            </div>
            <div className="card__buttons">
                <button onClick={()=>onAddCart()}>{buttonState ? 'ADD TO CART' : 'DROP FROM CART'}</button>
                <button>DETAILS</button>
            </div>
        </div>
    );
}

export default MainProductsItem;

