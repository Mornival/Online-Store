import { IProduct } from "../../types/types";
import { useContext } from 'react';
import './BasketGood.scss';
import contextCart from "../context/contextCart";
import { ICard } from "../../types/types";
import { Link } from 'react-router-dom';

const FALLBACK = 'https://placehold.co/120x120/e0e0e0/999?text=Нет+фото';

interface Props {
    product: IProduct;
    quantity: number;
}

function BasketGood({ product, quantity }: Props): JSX.Element {
    const { dataCart, setDataCart } = useContext(contextCart);
    const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100));

    const removeOne = () => {
        if (quantity <= 1) {
            // Last copy — remove all
            const arr = dataCart.filter(item => item.objProduct.id !== product.id);
            localStorage.setItem('dataCart', JSON.stringify(arr));
            setDataCart(arr);
        } else {
            // More than 1 — remove just one copy
            const arr = [...dataCart];
            const idx = arr.findIndex(item => item.objProduct.id === product.id);
            if (idx !== -1) {
                arr.splice(idx, 1);
                localStorage.setItem('dataCart', JSON.stringify(arr));
                setDataCart(arr);
            }
        }
    };

    const addOne = () => {
        const arr: ICard[] = [...dataCart, { objProduct: product }];
        localStorage.setItem('dataCart', JSON.stringify(arr));
        setDataCart(arr);
    };

    const removeItem = () => {
        const arr = dataCart.filter(item => item.objProduct.id !== product.id);
        localStorage.setItem('dataCart', JSON.stringify(arr));
        setDataCart(arr);
    };

    return (
        <div className="cart-item">
            <Link to={`/details/${product.id}`} className="cart-item__image">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                />
            </Link>

            <div className="cart-item__info">
                <Link to={`/details/${product.id}`} className="cart-item__title">{product.title}</Link>
                <div className="cart-item__meta">
                    <span>{product.brand}</span>
                    <span>★ {product.rating}</span>
                </div>
            </div>

            <div className="cart-item__controls">
                <div className="cart-item__qty">
                    <button className="cart-item__qty-btn" onClick={removeOne}>−</button>
                    <span className="cart-item__qty-val">{quantity}</span>
                    <button className="cart-item__qty-btn" onClick={addOne}>+</button>
                </div>
            </div>

            <div className="cart-item__price">
                <div className="cart-item__price-old">{product.price * quantity} ₽</div>
                <div className="cart-item__price-new">{discountedPrice * quantity} ₽</div>
            </div>

            <button className="cart-item__remove" onClick={removeItem} title="Удалить">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
            </button>
        </div>
    );
}

export default BasketGood;
