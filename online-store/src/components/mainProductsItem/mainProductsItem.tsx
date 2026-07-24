import {useState, useContext, useEffect} from 'react';
import './mainProductsItem.scss';
import ContextCart from '../context/contextCart';
import { FavContext } from '../context/OtherContexts';
import { ICard } from '../../types/types';
import { Link } from 'react-router-dom';

const MainProductsItem = ({objProduct, widthCard, idCard }: ICard) => {
    const [buttonState, setButtonState] = useState(true);
    const [dataIdCard] = useState(idCard);
    const { dataCart, setDataCart } = useContext(ContextCart);
    const { favorites, toggleFavorite } = useContext(FavContext);
    const {id,title,price, discountPercentage, rating, thumbnail} = objProduct;
    const isFav = favorites.includes(id);

    const discountedPrice = Math.round(price * (1 - discountPercentage / 100));

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
        <div className="card">
            <button
                className={`card__fav ${isFav ? 'card__fav--active' : ''}`}
                onClick={(e) => { e.preventDefault(); toggleFavorite(id); }}
                title={isFav ? 'Убрать из избранного' : 'В избранное'}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFav ? '#cb11ab' : 'none'} stroke={isFav ? '#cb11ab' : '#999'} strokeWidth="2">
                    <path d="M20.84 4.61C19.58 3.35 17.86 2.65 16.06 2.65C14.26 2.65 12.54 3.35 11.28 4.61L12 5.33L12.72 4.61C11.46 3.35 9.74 2.65 7.94 2.65C6.14 2.65 4.42 3.35 3.16 4.61C1.84 5.93 1.12 7.69 1.12 9.55C1.12 11.41 1.84 13.17 3.16 14.49L12 23.33L20.84 14.49C22.16 13.17 22.88 11.41 22.88 9.55C22.88 7.69 22.16 5.93 20.84 4.61Z"/>
                </svg>
            </button>
            <Link to={`/details/${dataIdCard}`} className="card__link">
                <div className="card__image">
                    <img
                        src={thumbnail}
                        alt={title}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                'https://placehold.co/300x300/e0e0e0/999?text=Нет+фото';
                        }}
                    />
                </div>
                <div className="card__info">
                    <h3 className="card__title">{title}</h3>
                    <div className="card__rating">★ {rating.toFixed(1)}</div>
                    <div className="card__price">
                        <span className="card__price-old">{price} ₽</span>
                        <span className="card__price-new">{discountedPrice} ₽</span>
                    </div>
                </div>
            </Link>
            <div className="card__buttons">
                <button
                    className={`card__btn card__btn--cart ${!buttonState ? 'card__btn--active' : ''}`}
                    onClick={onAddCart}
                >
                    {buttonState ? 'В корзину' : 'В корзине'}
                </button>
            </div>
        </div>
    );
}

export default MainProductsItem;
