import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './FavoritesPage.scss';
import { FavContext } from '../context/OtherContexts';
import contextProducts from '../context/contextProducts';
import ContextCart from '../context/contextCart';
import { IProduct, ICard } from '../../types/types';

const FavoritesPage = () => {
    const { favorites, toggleFavorite } = useContext(FavContext);
    const { dataProducts } = useContext(contextProducts);
    const { dataCart, setDataCart } = useContext(ContextCart);

    const favProducts = dataProducts.filter(p => favorites.includes(p.id));

    function onAddCart(product: IProduct) {
        const exists = dataCart.some((c: ICard) => c.objProduct.id === product.id);
        if (!exists) {
            const next = [...dataCart, { objProduct: product }];
            setDataCart(next);
            localStorage.setItem('dataCart', JSON.stringify(next));
        }
    }

    function isInCart(productId: number): boolean {
        return dataCart.some((c: ICard) => c.objProduct.id === productId);
    }

    return (
        <div className="favorites">
            <div className="container">
                <div className="favorites__header">
                    <h1 className="favorites__title">Избранное</h1>
                    <span className="favorites__count">{favProducts.length} товаров</span>
                </div>

                {favProducts.length === 0 ? (
                    <div className="favorites__empty">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5">
                            <path d="M20.84 4.61C19.58 3.35 17.86 2.65 16.06 2.65C14.26 2.65 12.54 3.35 11.28 4.61L12 5.33L12.72 4.61C11.46 3.35 9.74 2.65 7.94 2.65C6.14 2.65 4.42 3.35 3.16 4.61C1.84 5.93 1.12 7.69 1.12 9.55C1.12 11.41 1.84 13.17 3.16 14.49L12 23.33L20.84 14.49C22.16 13.17 22.88 11.41 22.88 9.55C22.88 7.69 22.16 5.93 20.84 4.61Z"/>
                        </svg>
                        <h2>Список избранного пуст</h2>
                        <p>Добавляйте товары в избранное, нажимая на сердечко</p>
                        <Link to="/" className="favorites__empty-btn">Перейти в каталог</Link>
                    </div>
                ) : (
                    <div className="favorites__grid">
                        {favProducts.map(product => {
                            const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
                            const inCart = isInCart(product.id);
                            return (
                                <div className="fav-card" key={product.id}>
                                    <button
                                        className="fav-card__fav fav-card__fav--active"
                                        onClick={() => toggleFavorite(product.id)}
                                        title="Убрать из избранного"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#cb11ab" stroke="#cb11ab" strokeWidth="2">
                                            <path d="M20.84 4.61C19.58 3.35 17.86 2.65 16.06 2.65C14.26 2.65 12.54 3.35 11.28 4.61L12 5.33L12.72 4.61C11.46 3.35 9.74 2.65 7.94 2.65C6.14 2.65 4.42 3.35 3.16 4.61C1.84 5.93 1.12 7.69 1.12 9.55C1.12 11.41 1.84 13.17 3.16 14.49L12 23.33L20.84 14.49C22.16 13.17 22.88 11.41 22.88 9.55C22.88 7.69 22.16 5.93 20.84 4.61Z"/>
                                        </svg>
                                    </button>
                                    {product.discountPercentage > 0 && (
                                        <span className="fav-card__badge">-{product.discountPercentage.toFixed(0)}%</span>
                                    )}
                                    <Link to={`/details/${product.id}`} className="fav-card__link">
                                        <div className="fav-card__image">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src =
                                                        'https://placehold.co/300x300/e0e0e0/999?text=Нет+фото';
                                                }}
                                            />
                                        </div>
                                        <div className="fav-card__info">
                                            <h3 className="fav-card__title">{product.title}</h3>
                                            <div className="fav-card__rating">★ {product.rating.toFixed(1)}</div>
                                            <div className="fav-card__price">
                                                <span className="fav-card__price-old">{product.price} ₽</span>
                                                <span className="fav-card__price-new">{discountedPrice} ₽</span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="fav-card__buttons">
                                        <button
                                            className={`fav-card__btn ${inCart ? 'fav-card__btn--active' : ''}`}
                                            onClick={() => !inCart && onAddCart(product)}
                                        >
                                            {inCart ? 'В корзине' : 'В корзину'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
