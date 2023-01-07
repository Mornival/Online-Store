import {useState, useContext, useEffect} from 'react';
import './mainProductsItem.scss';
import ContextCart from '../context/contextCart';
import { ICard } from '../../types/types';
import { Link } from 'react-router-dom';

const MainProductsItem = ({objProduct, widthCard , idCard }: ICard) => {
    const [buttonState, setButtonState] = useState(true);
    const [dataIdCard, setDataIdCard] = useState(idCard);
    const boxShadow = buttonState ? 'none' : '0 0 25px wheat';
    const { dataCart, setDataCart } = useContext(ContextCart);
    const {id,title,price, discountPercentage,category, brand, rating, stock, thumbnail} = objProduct;

    const textButtonAdd = widthCard === 210 ? 'ADD TO' : 'ADD TO CART';
    const textButtonDrop = widthCard === 210 ? 'DROP' : 'DROP FROM CART';

    function onAddCart() {
        let arr: ICard[] = [];
        if (buttonState) {
            arr = [...dataCart, {objProduct}];
            setDataCart([...dataCart, {objProduct}]);
        } else {
            dataCart.find(({objProduct}: ICard) => {
                if (objProduct.id === id) {
                    arr = dataCart.filter(({objProduct}: ICard) => objProduct.id !== id);
                    setDataCart(dataCart.filter(({objProduct}: ICard) => objProduct.id !== id));
                }
            })
        }
        setButtonState(buttonState => !buttonState);
        console.log(arr);
        localStorage.setItem('dataCart',JSON.stringify(arr));
    }

    useEffect(() => {
        dataCart.find(({objProduct}: ICard) => {
            if (objProduct.id === id) {
                setButtonState(false);
            }
        })
    },[dataCart]);

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
                <button onClick={()=>onAddCart()}>{buttonState ?  textButtonAdd : textButtonDrop }</button>
                <Link to={`/details/${dataIdCard}`}><button>DETAILS</button></Link>
            </div>
        </div>
    );
}

export default MainProductsItem;

