import {useState, useContext, useEffect} from 'react';
import './mainProductsItem.scss';
import ContextProducts from '../context/contextProducts';
import { ICard } from '../../types/types';


const MainProductsItem = ({ id, title, price, discountPercentage, rating, stock, brand, category, thumbnail, widthCard }: ICard) => {
   const [buttonState, setButtonState] = useState(true);
   const boxShadow = buttonState ? 'none' : '0 0 25px wheat';
   const {dataCart, setDataCart} = useContext(ContextProducts);

   function onAddCart() {
        if(buttonState) {
            setDataCart([...dataCart,{id, title, price, discountPercentage, rating, stock, brand, category, thumbnail}]);
        } else {
            dataCart.find((item:ICard) => {
                if(item.id === id) {
                    setDataCart(dataCart.filter((item:ICard)=> item.id !== id));
                }
            })
        }
        setButtonState(buttonState => !buttonState);         
   }

    useEffect(() => {
        dataCart.find((item:ICard) => {
            if (item.id === id) {
                setButtonState(false);
            }
        })
    })

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

