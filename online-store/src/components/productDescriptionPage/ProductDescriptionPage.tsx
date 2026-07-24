import './ProductDescriptionPage.scss';
import { IProduct } from '../../types/types';
import React, { useState, useContext, useMemo } from 'react';
import ModalContext, { FavContext } from '../context/OtherContexts';
import { Link, useParams, Params } from 'react-router-dom';
import ContextCart from '../context/contextCart';
import { ICard } from '../../types/types';
import { dropGood } from './dropGood';

const FALLBACK = 'https://placehold.co/600x600/e0e0e0/999?text=Нет+фото';

const reviewNames = [
    'Алексей', 'Мария', 'Дмитрий', 'Анна', 'Сергей',
    'Елена', 'Иван', 'Ольга', 'Павел', 'Наталья',
    'Максим', 'Татьяна', 'Андрей', 'Ирина', 'Виктор'
];

const reviewTexts = [
    'Отличный товар, всё как на фото. Доставка быстрая, упаковка качественная.',
    'Хорошее качество за свою цену. Рекомендую к покупке.',
    'Товар соответствует описанию. Единственный минус — долгая доставка.',
    'Пользуюсь уже месяц, всё нравится. Качество на высоте.',
    'Ждала долго, но стоило того. Внешний вид приятный.',
    'Нормальный товар, без лишних претензий. Работает как положено.',
    'Красивая упаковка, товар без повреждений. Буду заказывать ещё.',
    'Соотношение цена/качество отличное. Продавцу спасибо!',
    'Качество среднее, но за такие деньги можно простить.',
    'Был в восторге от покупки! Всё пришло вовремя.',
    'Товар ожидания не оправдал. На фото выглядел лучше.',
    'Норм, но могло быть и лучше. Три звезды за это.',
    'Заказываю не первый раз, всё стабильно хорошо.',
    'Подарок маме очень понравился. Спасибо магазину!',
    'Всё супер! Качество materials отличное.'
];

function generateReviews(productId: number, count: number) {
    const reviews = [];
    for (let i = 0; i < count; i++) {
        const seed = (productId * 7 + i * 13) % reviewNames.length;
        const textSeed = (productId * 3 + i * 17) % reviewTexts.length;
        const daysAgo = ((productId + i) * 11) % 120;
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        reviews.push({
            id: i,
            name: reviewNames[seed],
            rating: 3.5 + ((productId + i) % 16) / 10,
            date: date.toLocaleDateString('ru-RU'),
            text: reviewTexts[textSeed],
            helpful: ((productId + i) * 7) % 30
        });
    }
    return reviews;
}

interface goodDescription {
    products: IProduct[];
}

function ProductDescription(goods: goodDescription) {
    const id: Readonly<Params<string>> = useParams();
    let numberId: number = 0;
    let good: IProduct = goods.products[0];
    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
    const { dataCart, setDataCart } = useContext(ContextCart);
    let hasProductInCart: boolean = false;

    if (id.id) {
        numberId = +id.id;
    }
    for (let i = 0; i < goods.products.length; i++) {
        if (numberId === goods.products[i].id) {
            good = goods.products[i];
            break;
        }
    }

    dataCart.forEach((v) => {
        if (v.objProduct.id === numberId) {
            hasProductInCart = true;
        }
    });

    const [hasInCart, SetHasInCart] = useState(hasProductInCart);
    let { modal, setModal } = useContext(ModalContext);
    const { favorites, toggleFavorite } = useContext(FavContext);
    const isFav = favorites.includes(good.id);

    const reviews = useMemo(() => generateReviews(good.id, 5), [good.id]);
    const avgRating = useMemo(() => {
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / reviews.length).toFixed(1);
    }, [reviews]);

    const clickDrop = () => {
        const arr: ICard[] = dropGood(dataCart, good.id);
        SetHasInCart(false);
        localStorage.setItem('dataCart', JSON.stringify(arr));
        setDataCart(arr);
    };

    const clickAdd = () => {
        const arr: ICard[] = [...dataCart];
        arr.push({ objProduct: good });
        SetHasInCart(true);
        localStorage.setItem('dataCart', JSON.stringify(arr));
        setDataCart(arr);
    };

    const clickBuy = () => {
        if (!hasInCart) clickAdd();
        if (setModal && !modal) setModal();
    };

    const clickStore = () => {
        if (setModal && modal) setModal();
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        (e.target as HTMLImageElement).src = FALLBACK;
    };

    const discountedPrice = Math.round(good.price * (1 - good.discountPercentage / 100));
    const discountPercent = Math.round(good.discountPercentage);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`star ${i < Math.round(rating) ? 'star--filled' : ''}`}>★</span>
        ));
    };

    const specs = [
        { label: 'Бренд', value: good.brand },
        { label: 'Категория', value: good.category },
        { label: 'Артикул', value: `ART-${String(good.id).padStart(4, '0')}` },
        { label: 'В наличии', value: `${good.stock} шт.` },
        { label: 'Рейтинг', value: `${good.rating} / 5` },
    ];

    return (
        <div className="pd">
            {/* Breadcrumb */}
            <div className="pd__breadcrumb">
                <Link to="/" onClick={clickStore}>Магазин</Link>
                <span>/</span>
                <span>{good.category}</span>
                <span>/</span>
                <span>{good.brand}</span>
                <span>/</span>
                <span className="pd__breadcrumb--current">{good.title}</span>
            </div>

            {/* Main content */}
            <div className="pd__main">
                {/* Gallery */}
                <div className="pd__gallery">
                    <div className="pd__gallery-thumbs">
                        {good.images.map((v, i) => (
                            <div
                                key={i}
                                className={`pd__gallery-thumb ${currentImageIdx === i ? 'pd__gallery-thumb--active' : ''}`}
                                onClick={() => setCurrentImageIdx(i)}
                            >
                                <img src={v} alt="" onError={handleError} />
                            </div>
                        ))}
                    </div>
                    <div className="pd__gallery-main">
                        <img
                            src={good.images[currentImageIdx] || good.thumbnail}
                            alt={good.title}
                            onError={handleError}
                        />
                        {discountPercent > 0 && (
                            <div className="pd__gallery-badge">-{discountPercent}%</div>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="pd__info">
                    <div className="pd__brand">{good.brand}</div>
                    <h1 className="pd__title">{good.title}</h1>

                    <div className="pd__rating-row">
                        <div className="pd__stars">{renderStars(good.rating)}</div>
                        <span className="pd__rating-value">{avgRating}</span>
                        <span className="pd__reviews-link" onClick={() => setActiveTab('reviews')}>
                            {reviews.length} отзывов
                        </span>
                        <span className="pd__orders">{good.stock} заказов</span>
                    </div>

                    <div className="pd__price-block">
                        <div className="pd__price-old">{good.price} ₽</div>
                        <div className="pd__price-new">{discountedPrice} ₽</div>
                        <div className="pd__price-discount">- {discountPercent}%</div>
                    </div>

                    <div className="pd__delivery">
                        <div className="pd__delivery-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                            <div>
                                <div className="pd__delivery-title">Доставка</div>
                                <div className="pd__delivery-text">Завтра, 24 июля</div>
                            </div>
                        </div>
                        <div className="pd__delivery-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <div>
                                <div className="pd__delivery-title">Пункт выдачи</div>
                                <div className="pd__delivery-text">Бесплатно</div>
                            </div>
                        </div>
                    </div>

                    <div className="pd__stock">
                        <span className="pd__stock-dot" />
                        В наличии: {good.stock} шт.
                    </div>

                    <div className="pd__actions">
                        {hasInCart ? (
                            <button className="pd__btn pd__btn--in-cart" onClick={clickDrop}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                                В корзине
                            </button>
                        ) : (
                            <button className="pd__btn pd__btn--add" onClick={clickAdd}>
                                В корзину
                            </button>
                        )}
                        <Link to="/basket">
                            <button className="pd__btn pd__btn--buy" onClick={clickBuy}>
                                Купить сейчас
                            </button>
                        </Link>
                        <button className={`pd__btn pd__btn--fav ${isFav ? 'pd__btn--fav-active' : ''}`} onClick={() => toggleFavorite?.(good.id)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill={isFav ? '#ff4444' : 'none'} stroke={isFav ? '#ff4444' : 'currentColor'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                        </button>
                    </div>

                    <div className="pd__seller">
                        <div className="pd__seller-label">Продавец</div>
                        <div className="pd__seller-name">{good.brand}</div>
                        <div className="pd__seller-rating">★ {good.rating}</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="pd__tabs">
                <button
                    className={`pd__tab ${activeTab === 'desc' ? 'pd__tab--active' : ''}`}
                    onClick={() => setActiveTab('desc')}
                >
                    Описание
                </button>
                <button
                    className={`pd__tab ${activeTab === 'specs' ? 'pd__tab--active' : ''}`}
                    onClick={() => setActiveTab('specs')}
                >
                    Характеристики
                </button>
                <button
                    className={`pd__tab ${activeTab === 'reviews' ? 'pd__tab--active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Отзывы ({reviews.length})
                </button>
            </div>

            <div className="pd__tab-content">
                {activeTab === 'desc' && (
                    <div className="pd__desc">
                        <p>{good.description}</p>
                    </div>
                )}

                {activeTab === 'specs' && (
                    <div className="pd__specs">
                        {specs.map((s, i) => (
                            <div key={i} className="pd__specs-row">
                                <span className="pd__specs-label">{s.label}</span>
                                <span className="pd__specs-dots" />
                                <span className="pd__specs-value">{s.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="pd__reviews">
                        <div className="pd__reviews-summary">
                            <div className="pd__reviews-avg">
                                <div className="pd__reviews-avg-num">{avgRating}</div>
                                <div className="pd__reviews-avg-stars">{renderStars(+avgRating)}</div>
                                <div className="pd__reviews-avg-count">{reviews.length} отзывов</div>
                            </div>
                            <div className="pd__reviews-bars">
                                {[5, 4, 3, 2, 1].map(n => {
                                    const count = reviews.filter(r => Math.round(r.rating) === n).length;
                                    const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                                    return (
                                        <div key={n} className="pd__reviews-bar">
                                            <span className="pd__reviews-bar-label">{n} ★</span>
                                            <div className="pd__reviews-bar-track">
                                                <div className="pd__reviews-bar-fill" style={{ width: `${pct}%` }} />
                                            </div>
                                            <span className="pd__reviews-bar-count">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {reviews.map(r => (
                            <div key={r.id} className="pd__review">
                                <div className="pd__review-header">
                                    <div className="pd__review-avatar">
                                        {r.name[0]}
                                    </div>
                                    <div className="pd__review-meta">
                                        <div className="pd__review-name">{r.name}</div>
                                        <div className="pd__review-date">{r.date}</div>
                                    </div>
                                    <div className="pd__review-stars">{renderStars(r.rating)}</div>
                                </div>
                                <div className="pd__review-text">{r.text}</div>
                                <div className="pd__review-footer">
                                    <button className="pd__review-helpful">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 00-6 0v4H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-5z"/></svg>
                                        Полезно ({r.helpful})
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export { dropGood };
export default ProductDescription;
