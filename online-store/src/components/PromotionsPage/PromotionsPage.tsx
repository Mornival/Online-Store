import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PromotionsPage.scss';
import contextProducts from '../context/contextProducts';
import ContextCart from '../context/contextCart';
import { IProduct, ICard } from '../../types/types';

const PromotionsPage = () => {
    const { dataProducts } = useContext(contextProducts);
    const { dataCart, setDataCart } = useContext(ContextCart);

    const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 47, seconds: 23 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) { seconds = 59; minutes--; }
                if (minutes < 0) { minutes = 59; hours--; }
                if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const hotDeals = [...dataProducts]
        .sort((a, b) => b.discountPercentage - a.discountPercentage)
        .slice(0, 8);

    const categories = Array.from(new Set(dataProducts.map(p => p.category)));

    const categoryDiscounts: Record<string, number> = {};
    categories.forEach(cat => {
        const catProducts = dataProducts.filter(p => p.category === cat);
        const avgDiscount = catProducts.reduce((sum, p) => sum + p.discountPercentage, 0) / catProducts.length;
        categoryDiscounts[cat] = Math.round(avgDiscount);
    });

    const topCategories = Object.entries(categoryDiscounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 4);

    function onAddCart(product: IProduct) {
        const exists = dataCart.some((c: ICard) => c.objProduct.id === product.id);
        if (!exists) {
            setDataCart([...dataCart, { objProduct: product }]);
            localStorage.setItem('dataCart', JSON.stringify([...dataCart, { objProduct: product }]));
        }
    }

    function isInCart(productId: number): boolean {
        return dataCart.some((c: ICard) => c.objProduct.id === productId);
    }

    const pad = (n: number) => n.toString().padStart(2, '0');

    return (
        <div className="promotions">
            <div className="container">
                <div className="promotions__hero">
                    <div className="promotions__hero-content">
                        <span className="promotions__hero-badge">АКЦИЯ</span>
                        <h1 className="promotions__hero-title">Скидки до <span className="promotions__hero-highlight">
                            {Math.max(...dataProducts.map(p => p.discountPercentage)).toFixed(0)}%
                            </span>
                        </h1>
                        <p className="promotions__hero-subtitle">Успейте купить товары по лучшим ценам</p>
                        <div className="promotions__timer">
                            <span className="promotions__timer-label">До конца акции</span>
                            <div className="promotions__timer-digits">
                                <div className="promotions__timer-block">
                                    <span className="promotions__timer-num">{pad(timeLeft.hours)}</span>
                                    <span className="promotions__timer-unit">ч</span>
                                </div>
                                <span className="promotions__timer-sep">:</span>
                                <div className="promotions__timer-block">
                                    <span className="promotions__timer-num">{pad(timeLeft.minutes)}</span>
                                    <span className="promotions__timer-unit">м</span>
                                </div>
                                <span className="promotions__timer-sep">:</span>
                                <div className="promotions__timer-block">
                                    <span className="promotions__timer-num">{pad(timeLeft.seconds)}</span>
                                    <span className="promotions__timer-unit">с</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="promotions__hero-visual">
                        <div className="promotions__hero-circle">
                            <span className="promotions__hero-percent">
                                -{Math.max(...dataProducts.map(p => p.discountPercentage)).toFixed(0)}%
                            </span>
                        </div>
                    </div>
                </div>

                <section className="promotions__section">
                    <div className="promotions__section-header">
                        <h2 className="promotions__section-title">По категориям</h2>
                    </div>
                    <div className="promotions__categories">
                        {topCategories.map(([category, discount]) => (
                            <Link
                                to={`/?category=${category}`}
                                key={category}
                                className="promotions__category-card"
                            >
                                <div className="promotions__category-icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="1.8"/>
                                        <path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7" stroke="currentColor" strokeWidth="1.8"/>
                                    </svg>
                                </div>
                                <div className="promotions__category-info">
                                    <span className="promotions__category-name">{category}</span>
                                    <span className="promotions__category-discount">Скидки до {discount}%</span>
                                </div>
                                <span className="promotions__category-arrow">→</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="promotions__section">
                    <div className="promotions__section-header">
                        <h2 className="promotions__section-title">Горячие предложения</h2>
                        <span className="promotions__section-count">{hotDeals.length} товаров</span>
                    </div>
                    <div className="promotions__grid">
                        {hotDeals.map(product => {
                            const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
                            const inCart = isInCart(product.id);
                            return (
                                <div className="promo-card" key={product.id}>
                                    <span className="promo-card__badge">-{product.discountPercentage.toFixed(0)}%</span>
                                    <Link to={`/details/${product.id}`} className="promo-card__link">
                                        <div className="promo-card__image">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src =
                                                        'https://placehold.co/300x300/e0e0e0/999?text=Нет+фото';
                                                }}
                                            />
                                        </div>
                                        <div className="promo-card__info">
                                            <h3 className="promo-card__title">{product.title}</h3>
                                            <div className="promo-card__rating">★ {product.rating.toFixed(1)}</div>
                                            <div className="promo-card__price">
                                                <span className="promo-card__price-old">{product.price} ₽</span>
                                                <span className="promo-card__price-new">{discountedPrice} ₽</span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="promo-card__buttons">
                                        <button
                                            className={`promo-card__btn ${inCart ? 'promo-card__btn--active' : ''}`}
                                            onClick={() => !inCart && onAddCart(product)}
                                        >
                                            {inCart ? 'В корзине' : 'В корзину'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="promotions__section">
                    <div className="promotions__banner">
                        <div className="promotions__banner-content">
                            <h3 className="promotions__banner-title">Бесплатная доставка</h3>
                            <p className="promotions__banner-text">При заказе от 2 000 ₽ доставка бесплатно по всей России</p>
                        </div>
                        <div className="promotions__banner-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M1 3H15V13H1V3Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path d="M15 8H19L23 12V13H15V8Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                                <circle cx="5.5" cy="18.5" r="2.5" stroke="white" strokeWidth="1.5"/>
                                <circle cx="18.5" cy="18.5" r="2.5" stroke="white" strokeWidth="1.5"/>
                            </svg>
                        </div>
                    </div>
                </section>

                <section className="promotions__section">
                    <div className="promotions__section-header">
                        <h2 className="promotions__section-title">Все акционные товары</h2>
                    </div>
                    <div className="promotions__grid promotions__grid--full">
                        {dataProducts
                            .filter(p => p.discountPercentage > 10)
                            .sort((a, b) => b.discountPercentage - a.discountPercentage)
                            .map(product => {
                                const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
                                const inCart = isInCart(product.id);
                                return (
                                    <div className="promo-card" key={product.id}>
                                        <span className="promo-card__badge">-{product.discountPercentage.toFixed(0)}%</span>
                                        <Link to={`/details/${product.id}`} className="promo-card__link">
                                            <div className="promo-card__image">
                                                <img
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src =
                                                            'https://placehold.co/300x300/e0e0e0/999?text=Нет+фото';
                                                    }}
                                                />
                                            </div>
                                            <div className="promo-card__info">
                                                <h3 className="promo-card__title">{product.title}</h3>
                                                <div className="promo-card__rating">★ {product.rating.toFixed(1)}</div>
                                                <div className="promo-card__price">
                                                    <span className="promo-card__price-old">{product.price} ₽</span>
                                                    <span className="promo-card__price-new">{discountedPrice} ₽</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="promo-card__buttons">
                                            <button
                                                className={`promo-card__btn ${inCart ? 'promo-card__btn--active' : ''}`}
                                                onClick={() => !inCart && onAddCart(product)}
                                            >
                                                {inCart ? 'В корзине' : 'В корзину'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PromotionsPage;
